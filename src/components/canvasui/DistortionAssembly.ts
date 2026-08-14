/*
 * CanvasUI texture adapter.
 *
 * Legacy raster adapter for standalone canvas experiments. Live section
 * transitions intentionally avoid this approximation and distort the real DOM
 * SourceGraphic instead, so their final frame never swaps textures.
 */

export type DistortionPattern = 'blocks' | 'layers' | 'slices';

export interface DistortionAssemblyOptions {
  duration?: number;
  columns?: number;
  rows?: number;
  pattern?: DistortionPattern;
  accent?: string;
}

export interface DistortionAssemblyInstance {
  finished: Promise<void>;
  destroy: () => void;
}

export interface SectionTextureOptions {
  height: number;
  scale?: number;
  background: string;
}

const isTransparent = (color: string) =>
  !color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)' || color === 'rgba(0,0,0,0)';

const drawSectionImage = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  try {
    const source = new URL(image.currentSrc || image.src, window.location.href);
    const safeSource = source.origin === window.location.origin || image.crossOrigin === 'anonymous';
    if (safeSource && image.complete && image.naturalWidth > 0) {
      context.drawImage(image, x, y, width, height);
      return;
    }
  } catch {
    // The structural placeholder below is deliberately used for unsafe media.
  }

  context.save();
  context.globalAlpha *= 0.16;
  context.fillRect(x, y, width, height);
  context.beginPath();
  context.moveTo(x, y + height);
  context.lineTo(x + width, y);
  context.stroke();
  context.restore();
};

/**
 * Builds a fast visual texture from the section's computed layout. This is a
 * current-browser adapter for CanvasUI: it avoids the experimental
 * `drawElementImage` API and does not clone or relayout the live section.
 */
export const captureSectionTexture = (section: HTMLElement, options: SectionTextureOptions) => {
  const bounds = section.getBoundingClientRect();
  const cssWidth = Math.max(1, Math.round(bounds.width));
  const cssHeight = Math.max(1, Math.round(options.height));
  const scale = Math.max(0.75, Math.min(options.scale ?? 1, 1.25));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cssWidth * scale));
  canvas.height = Math.max(1, Math.round(cssHeight * scale));
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return canvas;

  context.scale(scale, scale);
  context.fillStyle = options.background;
  context.fillRect(0, 0, cssWidth, cssHeight);
  context.textBaseline = 'top';
  context.lineCap = 'square';

  const elements = [section, ...Array.from(section.querySelectorAll<HTMLElement>('*'))].slice(0, 650);
  elements.forEach((element) => {
    if (
      element !== section &&
      (element.closest('.section-navigator') ||
        element.classList.contains('section-distortion-canvas') ||
        element.getAttribute('aria-hidden') === 'true')
    ) {
      return;
    }

    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) <= 0.01) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left - bounds.left;
    const y = rect.top - bounds.top;
    const width = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0 || x >= cssWidth || x + width <= 0 || y >= cssHeight || y + height <= 0) return;

    context.save();
    context.globalAlpha = Math.max(0, Math.min(1, Number(style.opacity) || 1));

    if (element !== section && !isTransparent(style.backgroundColor)) {
      context.fillStyle = style.backgroundColor;
      context.fillRect(x, y, width, height);
    }

    const borderTop = Number.parseFloat(style.borderTopWidth);
    const borderRight = Number.parseFloat(style.borderRightWidth);
    const borderBottom = Number.parseFloat(style.borderBottomWidth);
    const borderLeft = Number.parseFloat(style.borderLeftWidth);
    if (borderTop > 0 && style.borderTopStyle !== 'none') {
      context.fillStyle = style.borderTopColor;
      context.fillRect(x, y, width, borderTop);
    }
    if (borderRight > 0 && style.borderRightStyle !== 'none') {
      context.fillStyle = style.borderRightColor;
      context.fillRect(x + width - borderRight, y, borderRight, height);
    }
    if (borderBottom > 0 && style.borderBottomStyle !== 'none') {
      context.fillStyle = style.borderBottomColor;
      context.fillRect(x, y + height - borderBottom, width, borderBottom);
    }
    if (borderLeft > 0 && style.borderLeftStyle !== 'none') {
      context.fillStyle = style.borderLeftColor;
      context.fillRect(x, y, borderLeft, height);
    }

    if (element instanceof HTMLImageElement) {
      context.fillStyle = style.color;
      context.strokeStyle = style.color;
      drawSectionImage(context, element, x, y, width, height);
    }

    const directText = Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.replace(/\s+/g, ' ').trim() ?? '')
      .filter(Boolean)
      .join(' ');

    if (directText) {
      const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
      const paddingTop = Number.parseFloat(style.paddingTop) || 0;
      const fontSize = Number.parseFloat(style.fontSize) || 16;
      const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.2;
      const textX = x + paddingLeft;
      const textY = y + paddingTop;
      const textWidth = Math.max(1, width - paddingLeft - (Number.parseFloat(style.paddingRight) || 0));
      context.fillStyle = style.color;
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      context.textAlign = style.textAlign === 'center' || style.textAlign === 'right' ? style.textAlign : 'left';
      const alignedX = style.textAlign === 'center' ? x + width / 2 : style.textAlign === 'right' ? x + width : textX;

      if (/^H[1-4]$/.test(element.tagName) || element.matches('button, a, dt, dd, label')) {
        context.fillText(directText, alignedX, textY, textWidth);
      } else {
        const lineCount = Math.max(1, Math.min(5, Math.round(height / Math.max(lineHeight, 1))));
        for (let line = 0; line < lineCount; line += 1) {
          const taper = line === lineCount - 1 ? 0.58 : 0.9 - line * 0.035;
          context.globalAlpha *= 0.72;
          context.fillRect(
            textX,
            textY + line * lineHeight + fontSize * 0.72,
            textWidth * taper,
            Math.max(1, fontSize * 0.08)
          );
        }
      }
    }

    context.restore();
  });

  return canvas;
};

const VERTEX_SHADER = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aUv;
layout(location = 1) in vec2 aCenter;
layout(location = 2) in vec2 aLocal;
layout(location = 3) in vec4 aMeta;

uniform float uProgress;
uniform float uTime;
uniform float uPattern;
uniform float uAspect;

out vec2 vUv;
out vec2 vLocal;
out float vSettle;
out float vSeed;

const float PI = 3.14159265359;

float assemblyCurve(float value) {
  return value * value * (3.0 - 2.0 * value);
}

void main() {
  float seedA = aMeta.x;
  float seedB = aMeta.y;
  float delay = aMeta.z;
  float layer = aMeta.w;
  float localProgress = clamp((uProgress - delay) / max(1.0 - delay, 0.001), 0.0, 1.0);
  float settle = assemblyCurve(localProgress);
  float loose = 1.0 - settle;

  vec2 local = aUv - aCenter;
  float angle = (seedA - 0.5) * 1.55 * loose;
  float cosine = cos(angle);
  float sine = sin(angle);
  local.x *= uAspect;
  local = mat2(cosine, -sine, sine, cosine) * local;
  local.x /= max(uAspect, 0.8);

  // A CanvasUI-style fold: tiles start at different depths and flatten into
  // the DOM plane. Perspective is applied per piece, not to the whole section.
  float depth = loose * (0.12 + seedB * 0.28 + layer * 0.06);
  float perspective = 1.0 / (1.0 + depth * 0.9);
  float pieceScale = mix(0.7 + seedB * 0.14, 1.0, settle) * perspective;
  local *= pieceScale;

  vec2 direction;
  if (uPattern < 0.5) {
    direction = normalize(vec2(seedA - 0.5, seedB - 0.5) + vec2(0.001));
  } else if (uPattern < 1.5) {
    float side = mod(layer, 2.0) < 1.0 ? -1.0 : 1.0;
    direction = normalize(vec2(side, (seedB - 0.5) * 0.45));
  } else {
    float side = aCenter.x < 0.5 ? -1.0 : 1.0;
    direction = normalize(vec2(side * 0.35, seedB - 0.5));
  }

  vec2 offset = direction * loose * (0.035 + seedA * 0.13);
  offset.x /= max(uAspect, 0.8);
  offset.y += sin(aCenter.x * PI * 3.0 + seedB * 5.0 + uTime * 0.003) * loose * 0.035;

  // The crease travels through the composition while the pieces resolve.
  float fold = sin((aCenter.y + uProgress * 0.72) * PI) * loose;
  offset.x += fold * (seedA - 0.5) * 0.11;
  offset.y += fold * 0.035;

  vec2 position = aCenter + local + offset;
  gl_Position = vec4(position.x * 2.0 - 1.0, 1.0 - position.y * 2.0, depth * 0.12, 1.0);

  vUv = aUv;
  vLocal = aLocal;
  vSettle = settle;
  vSeed = seedA;
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
in vec2 vLocal;
in float vSettle;
in float vSeed;

uniform sampler2D uTexture;
uniform vec2 uTexel;
uniform vec3 uAccent;

out vec4 outColor;

void main() {
  float loose = 1.0 - vSettle;
  float split = loose * (1.4 + vSeed * 2.2);
  vec2 direction = normalize(vec2(vUv.x - 0.5, vUv.y - 0.5) + vec2(0.0001));
  vec2 offset = direction * uTexel * split;

  vec4 redSample = texture(uTexture, vUv + offset);
  vec4 greenSample = texture(uTexture, vUv);
  vec4 blueSample = texture(uTexture, vUv - offset);
  vec4 base = vec4(redSample.r, greenSample.g, blueSample.b, greenSample.a);

  float edgeDistance = min(min(vLocal.x, 1.0 - vLocal.x), min(vLocal.y, 1.0 - vLocal.y));
  float edge = 1.0 - smoothstep(0.0, 0.035, edgeDistance);
  float signal = edge * loose * (0.72 + 0.28 * smoothstep(0.05, 0.42, vSettle));
  vec3 color = mix(base.rgb, uAccent, clamp(loose * 0.08 + signal * 0.82, 0.0, 0.9));
  float alpha = base.a * mix(0.58 + vSeed * 0.2, 1.0, smoothstep(0.0, 0.32, vSettle));

  outColor = vec4(color, alpha);
}`;

const parseColor = (value: string): [number, number, number] => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return [0.42, 0.31, 1];
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return [red / 255, green / 255, blue / 255];
};

const hash = (x: number, y: number, salt: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7 + salt * 74.7) * 43758.5453;
  return value - Math.floor(value);
};

const createGeometry = (columns: number, rows: number) => {
  const vertices: number[] = [];
  const corners = [
    [0, 0],
    [1, 0],
    [0, 1],
    [0, 1],
    [1, 0],
    [1, 1]
  ];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const centerX = (column + 0.5) / columns;
      const centerY = (row + 0.5) / rows;
      const seedA = hash(column, row, 1);
      const seedB = hash(column, row, 2);
      const layer = (column + row * 2) % 3;
      const sweep = (column / Math.max(columns - 1, 1)) * 0.16 + (row / Math.max(rows - 1, 1)) * 0.1;
      const delay = Math.min(0.3, sweep + hash(column, row, 3) * 0.08);

      corners.forEach(([localX, localY]) => {
        vertices.push(
          (column + localX) / columns,
          (row + localY) / rows,
          centerX,
          centerY,
          localX,
          localY,
          seedA,
          seedB,
          delay,
          layer
        );
      });
    }
  }

  return new Float32Array(vertices);
};

const compileShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('CanvasUI distortion shader error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export const createDistortionAssembly = (
  output: HTMLCanvasElement,
  source: HTMLCanvasElement,
  options: DistortionAssemblyOptions = {}
): DistortionAssemblyInstance | null => {
  const gl = output.getContext('webgl2', {
    alpha: true,
    antialias: true,
    depth: false,
    premultipliedAlpha: false,
    powerPreference: 'high-performance'
  });
  if (!gl || gl.isContextLost()) return null;

  const columns = Math.max(2, Math.round(options.columns ?? 8));
  const rows = Math.max(2, Math.round(options.rows ?? 6));
  const duration = Math.max(450, options.duration ?? 1280);
  const pattern = options.pattern === 'layers' ? 1 : options.pattern === 'slices' ? 2 : 0;
  const accent = parseColor(options.accent ?? '#6c4eff');

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('CanvasUI distortion program error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  const geometry = createGeometry(columns, rows);
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!buffer || !texture) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.STATIC_DRAW);
  const stride = 10 * Float32Array.BYTES_PER_ELEMENT;
  [
    [0, 2, 0],
    [1, 2, 2],
    [2, 2, 4],
    [3, 4, 6]
  ].forEach(([location, size, offset]) => {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset * Float32Array.BYTES_PER_ELEMENT);
  });

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

  const progressLocation = gl.getUniformLocation(program, 'uProgress');
  const timeLocation = gl.getUniformLocation(program, 'uTime');
  const patternLocation = gl.getUniformLocation(program, 'uPattern');
  const aspectLocation = gl.getUniformLocation(program, 'uAspect');
  const textureLocation = gl.getUniformLocation(program, 'uTexture');
  const texelLocation = gl.getUniformLocation(program, 'uTexel');
  const accentLocation = gl.getUniformLocation(program, 'uAccent');

  gl.useProgram(program);
  gl.uniform1i(textureLocation, 0);
  gl.uniform1f(patternLocation, pattern);
  gl.uniform1f(aspectLocation, output.width / Math.max(output.height, 1));
  gl.uniform2f(texelLocation, 1 / Math.max(source.width, 1), 1 / Math.max(source.height, 1));
  gl.uniform3f(accentLocation, accent[0], accent[1], accent[2]);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let animationFrame = 0;
  let destroyed = false;
  let resolveFinished = () => {};
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });
  const start = performance.now();

  const render = (now: number) => {
    if (destroyed) return;
    const progress = Math.min(1, (now - start) / duration);
    gl.viewport(0, 0, output.width, output.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1f(progressLocation, progress);
    gl.uniform1f(timeLocation, now - start);
    gl.drawArrays(gl.TRIANGLES, 0, geometry.length / 10);

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
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    resolveFinished();
  };

  return { finished, destroy };
};
