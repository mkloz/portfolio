/*
 * One-shot adapter for Canvas UI's Displacement effect.
 *
 * The docs component keeps a pointer-driven displacement field mounted around
 * its children. This version accepts a pre-rasterized section texture, starts
 * with the same cell scramble, relaxes the field once, and destroys itself as
 * soon as the live DOM has assembled.
 */

export type DisplacementPattern = 'blocks' | 'layers' | 'slices';

export interface DisplacementAssemblyOptions {
  duration?: number;
  grid?: number;
  cellAspect?: number;
  relaxation?: number;
  shift?: number;
  aberration?: number;
  grain?: number;
  grainSize?: number;
  grainSpeed?: number;
  scramble?: number;
  pattern?: DisplacementPattern;
}

export interface DisplacementAssemblyInstance {
  ready: Promise<void>;
  finished: Promise<void>;
  destroy: () => void;
}

const VERTEX_SHADER = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Adapted directly from Canvas UI Displacement. WebGL textures use a
// bottom-left origin, so the source and field are sampled through the same
// top-left-oriented UV used by CanvasUI's original component.
const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uContent;
uniform sampler2D uField;
uniform vec2 uResolution;
uniform float uShift;
uniform float uAberration;
uniform float uGrain;
uniform float uGrainPx;
uniform float uGrainTick;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

void main() {
  vec2 cuv = vec2(vUv.x, 1.0 - vUv.y);
  vec2 offset = texture(uField, cuv).rg;
  vec2 push = offset * 0.02 * uShift;
  float aberration = uAberration * 0.08;
  vec2 low = vec2(0.001);
  vec2 high = vec2(0.999);
  vec4 red = texture(uContent, clamp(cuv - push * (1.0 + aberration), low, high));
  vec4 green = texture(uContent, clamp(cuv - push, low, high));
  vec4 blue = texture(uContent, clamp(cuv - push * (1.0 - aberration), low, high));
  float alpha = (red.a + green.a + blue.a) / 3.0;
  vec3 color = vec3(red.r * red.a, green.g * green.a, blue.b * blue.a);
  color = min(color, vec3(alpha));

  float pushPx = length(push * uResolution);
  float gate = smoothstep(1.5, 18.0, pushPx);
  vec2 cell = floor(gl_FragCoord.xy / max(uGrainPx, 1.0));
  float noise = hash(cell + vec2(uGrainTick * 0.37, uGrainTick * 0.113));
  color += (noise - 0.5) * 0.3 * uGrain * gate * alpha;
  color = clamp(color, vec3(0.0), vec3(alpha));
  outColor = vec4(color, alpha);
}`;

const compileShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('CanvasUI displacement shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const seedField = (
  field: Float32Array,
  columns: number,
  rows: number,
  amplitude: number,
  pattern: DisplacementPattern
) => {
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = 2 * (column + columns * row);
      const randomX = Math.random() * 2 - 1;
      const randomY = Math.random() * 2 - 1;
      let biasX = 0;
      let biasY = 0;

      if (pattern === 'layers') {
        biasX = ((row % 3) - 1) * 0.32;
      } else if (pattern === 'slices') {
        biasY = (column % 2 === 0 ? -1 : 1) * 0.26;
      }

      field[index] = (randomX + biasX) * amplitude;
      field[index + 1] = (randomY + biasY) * amplitude;
    }
  }
};

export const createDisplacementAssembly = (
  output: HTMLCanvasElement,
  source: HTMLCanvasElement,
  options: DisplacementAssemblyOptions = {}
): DisplacementAssemblyInstance | null => {
  const gl = output.getContext('webgl2', {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
    powerPreference: 'high-performance'
  });
  if (!gl || gl.isContextLost()) return null;

  const duration = Math.max(520, options.duration ?? 1350);
  const grid = Math.round(Math.min(Math.max(options.grid ?? 50, 4), 100));
  const cellAspect = Math.min(Math.max(options.cellAspect ?? 1, 0.25), 4);
  const relaxation = Math.min(Math.max(options.relaxation ?? 0.9, 0.5), 0.99);
  const shift = Math.min(Math.max(options.shift ?? 1, 0), 4);
  const aberration = Math.min(Math.max(options.aberration ?? 1.5, 0), 3);
  const grain = Math.min(Math.max(options.grain ?? 0.1, 0), 1);
  const grainSize = Math.min(Math.max(options.grainSize ?? 1, 0.5), 4);
  const grainSpeed = Math.min(Math.max(options.grainSpeed ?? 1, 0), 4);
  const scramble = Math.min(Math.max(options.scramble ?? 1, 0), 3);
  const pattern = options.pattern ?? 'blocks';

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('CanvasUI displacement program error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  const quad = gl.createBuffer();
  const contentTexture = gl.createTexture();
  const fieldTexture = gl.createTexture();
  if (!quad || !contentTexture || !fieldTexture) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, contentTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

  const columns = grid;
  const rows = Math.max(2, Math.min(Math.round((columns * output.height * cellAspect) / output.width), 200));
  const field = new Float32Array(columns * rows * 2);
  seedField(field, columns, rows, 40 * scramble, pattern);

  gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, columns, rows, 0, gl.RG, gl.FLOAT, field);

  const uniforms: Record<string, WebGLUniformLocation | null> = {
    content: gl.getUniformLocation(program, 'uContent'),
    field: gl.getUniformLocation(program, 'uField'),
    resolution: gl.getUniformLocation(program, 'uResolution'),
    shift: gl.getUniformLocation(program, 'uShift'),
    aberration: gl.getUniformLocation(program, 'uAberration'),
    grain: gl.getUniformLocation(program, 'uGrain'),
    grainPx: gl.getUniformLocation(program, 'uGrainPx'),
    grainTick: gl.getUniformLocation(program, 'uGrainTick')
  };
  const dpr = output.width / Math.max(output.clientWidth, 1);

  gl.useProgram(program);
  gl.uniform1i(uniforms.content, 0);
  gl.uniform1i(uniforms.field, 1);
  gl.uniform2f(uniforms.resolution, output.width, output.height);
  gl.uniform1f(uniforms.shift, shift);
  gl.uniform1f(uniforms.aberration, aberration);
  gl.uniform1f(uniforms.grain, grain);
  gl.uniform1f(uniforms.grainPx, Math.max(1, grainSize * dpr * 1.5));
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let animationFrame = 0;
  let destroyed = false;
  let resolveFinished = () => {};
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });
  const start = performance.now();
  let previous = start;

  const render = (now: number) => {
    if (destroyed) return;
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const delta = Math.min((now - previous) / 1000, 1 / 30);
    previous = now;

    if (progress >= 1) {
      field.fill(0);
    } else {
      const decay = Math.pow(relaxation, delta * 60);
      for (let index = 0; index < field.length; index += 1) field[index] *= decay;
    }

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, columns, rows, gl.RG, gl.FLOAT, field);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, contentTexture);
    gl.useProgram(program);
    gl.uniform1f(uniforms.grainTick, Math.floor((elapsed / 1000) * grainSpeed * 18));
    gl.viewport(0, 0, output.width, output.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(render);
      return;
    }
    resolveFinished();
  };

  animationFrame = requestAnimationFrame(render);

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(animationFrame);
    gl.deleteTexture(contentTexture);
    gl.deleteTexture(fieldTexture);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteBuffer(quad);
    resolveFinished();
  };

  return { ready: Promise.resolve(), finished, destroy };
};

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
let liveFilterSequence = 0;

/**
 * Applies the same grid-field idea to the browser's live SourceGraphic.
 * Unlike the canvas fallback, this path never approximates the section: text,
 * images, borders, and interactive content are the exact DOM being revealed.
 */
export const createLiveDisplacementAssembly = (
  element: HTMLElement,
  options: DisplacementAssemblyOptions = {}
): DisplacementAssemblyInstance | null => {
  const bounds = element.getBoundingClientRect();
  if (bounds.width < 1 || bounds.height < 1) return null;

  const duration = Math.max(520, options.duration ?? 1350);
  const grid = Math.round(Math.min(Math.max(options.grid ?? 50, 4), 100));
  const cellAspect = Math.min(Math.max(options.cellAspect ?? 1, 0.25), 4);
  const shift = Math.min(Math.max(options.shift ?? 1, 0), 4);
  const scramble = Math.min(Math.max(options.scramble ?? 1, 0), 3);
  const relaxation = Math.min(Math.max(options.relaxation ?? 0.9, 0.5), 0.99);
  const pattern = options.pattern ?? 'blocks';
  const columns = grid;
  const rows = Math.max(2, Math.min(Math.round((columns * bounds.height * cellAspect) / bounds.width), 200));
  const field = new Float32Array(columns * rows * 2);
  seedField(field, columns, rows, 1, pattern);

  // A tiny bitmap field becomes soft when an SVG filter stretches it over a
  // large section. An SVG field keeps each cell vector-sharp without creating
  // a multi-megabyte section-sized canvas on the main thread.
  const mapCells: string[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = 2 * (column + columns * row);
      const red = Math.round(128 + Math.max(-1, Math.min(1, field[index])) * 127);
      const green = Math.round(128 + Math.max(-1, Math.min(1, field[index + 1])) * 127);
      mapCells.push(`<path fill="rgb(${red} ${green} 128)" d="M${column} ${row}h1v1h-1z"/>`);
    }
  }
  const mapSource = encodeURIComponent(
    `<svg xmlns="${SVG_NAMESPACE}" viewBox="0 0 ${columns} ${rows}" shape-rendering="crispEdges">${mapCells.join('')}</svg>`
  );

  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  const filter = document.createElementNS(SVG_NAMESPACE, 'filter');
  const mapImage = document.createElementNS(SVG_NAMESPACE, 'feImage');
  const displacement = document.createElementNS(SVG_NAMESPACE, 'feDisplacementMap');
  const filterId = `section-displacement-${Date.now()}-${liveFilterSequence++}`;

  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'fixed';
  svg.style.pointerEvents = 'none';

  filter.setAttribute('id', filterId);
  filter.setAttribute('x', '-25%');
  filter.setAttribute('y', '-25%');
  filter.setAttribute('width', '150%');
  filter.setAttribute('height', '150%');
  filter.setAttribute('color-interpolation-filters', 'sRGB');

  mapImage.setAttribute('href', `data:image/svg+xml,${mapSource}`);
  mapImage.setAttribute('x', '0');
  mapImage.setAttribute('y', '0');
  mapImage.setAttribute('width', '100%');
  mapImage.setAttribute('height', '100%');
  mapImage.setAttribute('preserveAspectRatio', 'none');
  mapImage.setAttribute('result', 'cell-field');
  mapImage.setAttribute('image-rendering', 'pixelated');
  mapImage.style.imageRendering = 'pixelated';
  displacement.setAttribute('in', 'SourceGraphic');
  displacement.setAttribute('in2', 'cell-field');
  displacement.setAttribute('xChannelSelector', 'R');
  displacement.setAttribute('yChannelSelector', 'G');

  filter.append(mapImage, displacement);
  svg.append(filter);
  document.body.append(svg);

  const previousFilter = element.style.filter;
  const previousWillChange = element.style.willChange;
  const initialScale =
    Math.min(260, Math.max(72, Math.max(bounds.width, Math.min(bounds.height, 1000)) * 0.15)) * shift * scramble;
  displacement.setAttribute('scale', String(initialScale));

  // Attach the displaced live DOM before the browser can paint the trigger frame.
  // Waiting for setup frames here briefly exposed the finished section first,
  // making the assembly read as an effect applied after arrival.
  element.style.filter = `${previousFilter ? `${previousFilter} ` : ''}url(#${filterId})`;
  element.style.willChange = 'filter';

  let setupFrame = 0;
  let animationFrame = 0;
  let destroyed = false;
  let resolveReady = () => {};
  let resolveFinished = () => {};
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });

  setupFrame = window.requestAnimationFrame(() => {
    if (destroyed) return;
    resolveReady();
    const start = performance.now();

    const render = (now: number) => {
      if (destroyed) return;
      const progress = Math.min(1, (now - start) / duration);
      // Preserve visible cell travel across the whole transition. The old
      // exponential decay settled almost immediately, leaving only a blurred
      // first frame and an apparently static tail.
      const settlePower = 1 + (1 - relaxation) * 20;
      const easedProgress = 1 - Math.pow(1 - progress, settlePower);
      const remaining = 1 - easedProgress;
      displacement.setAttribute('scale', String(progress >= 1 ? 0 : initialScale * remaining));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }
      resolveFinished();
    };

    animationFrame = window.requestAnimationFrame(render);
  });

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    window.cancelAnimationFrame(setupFrame);
    window.cancelAnimationFrame(animationFrame);
    element.style.filter = previousFilter;
    element.style.willChange = previousWillChange;
    svg.remove();
    resolveReady();
    resolveFinished();
  };

  return { ready, finished, destroy };
};
