---
name: Mykhailo Kloz Portfolio
description: A control-room project ledger for full-stack work.
colors:
  ink: '#080808'
  paper: '#f4f2ed'
  white: '#ffffff'
  electric-blue: '#465bff'
  signal-yellow: '#ffd400'
  hot-coral: '#ff583d'
  acid-mint: '#74f0b3'
  violet: '#6c4eff'
  project-blue: '#3d5afe'
  project-orange: '#ff8a30'
  canvas-black: '#000000'
  canvas-status-green: '#4ade80'
  aws-s3-brand: '#e25444'
  aws-s3-brand-shadow: '#7b1d13'
  aws-s3-brand-deep: '#58150d'
typography:
  scale:
    micro: '0.6rem'
    microCompact: '0.61rem'
    microLabel: '0.62rem'
    microProject: '0.64rem'
    label: '0.68rem'
    projectTaglineMin: '1.5rem'
    contactEmailMin: '2.1rem'
    emailRailMin: '2.35rem'
    heroMin: '4rem'
    mobileHeroMin: '2.9rem'
    mobileHeroMax: '3.75rem'
    displayMin: '3.5rem'
    utilityDisplayMin: '3.5rem'
    utilityDisplayMax: '6rem'
    mobileFooterProjectMin: '3.5rem'
    mobileFooterProjectMax: '4.75rem'
    mobileFooterActionMin: '2.6rem'
    mobileFooterActionMax: '3.5rem'
    mobileProjectFooterMin: '3.25rem'
    mobileProjectFooterMax: '5.5rem'
    utilityHeroMin: '3.2rem'
    utilityHeroMax: '7.5rem'
    utilitySectionMin: '3.25rem'
    projectHeroMin: '4.5rem'
    projectHeroMax: '8rem'
    mobileProjectHeroShortMin: '4.5rem'
    mobileProjectHeroShortMax: '5.75rem'
    mobileProjectHeroMediumMin: '3.75rem'
    mobileProjectHeroMediumMax: '4.75rem'
    caseStudyPrimaryMin: '2.75rem'
    caseStudyPrimaryMax: '4.5rem'
    caseStudySupportingMin: '2.5rem'
    caseStudySupportingMax: '3.75rem'
    mobileCaseStudyMin: '2.35rem'
    mobileCaseStudyMax: '3rem'
    mobileContactQuestionMin: '2.8rem'
    mobileContactEmailMin: '1.45rem'
    contactMin: '4rem'
    contactUtilityMin: '3.75rem'
    contactUtilityMax: '7.5rem'
    contactQuestionUtilityMax: '7rem'
    contactEmailUtilityMax: '5rem'
    contactEmailMax: '6.5rem'
    footerProjectMin: '4rem'
    footerProjectMax: '7rem'
    projectFooterMin: '4.25rem'
    projectFooterMax: '8rem'
    headlineMax: '6rem'
    heroMax: '9rem'
    contactQuestionMax: '10rem'
    displayMax: '6rem'
    notFoundMin: '4rem'
    notFoundMax: '13rem'
  display:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(3.5rem, 8vw, 6rem)'
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: '-0.055em'
  headline:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(3.5rem, 8vw, 8rem)'
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: '-0.04em'
  hero:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(4rem, 8.5vw, 9rem)'
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: '-0.06em'
  contactType:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(4rem, 11vw, 11rem)'
    fontWeight: 800
    lineHeight: 0.79
    letterSpacing: '-0.055em'
  contactQuestion:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(4rem, 10vw, 10rem)'
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: '-0.04em'
  contactEmail:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(2.1rem, 6.15vw, 6.5rem)'
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: '-0.04em'
  emailRail:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(2.35rem, 6vw, 6.5rem)'
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: '-0.05em'
  body:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: '0.68rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '0.12em'
rounded:
  square: '0px'
  control: '4px'
  round: '999px'
spacing:
  edge-mobile: '20px'
  edge-tablet: '32px'
  edge-desktop: '48px'
  section-mobile: '112px'
  section-desktop: '160px'
components:
  signal-control:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.round}'
    size: '44px'
  ledger-row-active:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.square}'
    padding: '24px'
  field:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.white}'
    rounded: '{rounded.square}'
    padding: '16px 0'
---

# Design System: Mykhailo Kloz Portfolio

## Overview

**Creative North Star: "The Signal Ledger"**

The portfolio behaves like a control-room ledger. Large type states the role, while thin rules, mono readings, live evidence panes, and real project media connect each claim to a working artifact. Black, warm paper, and white carry almost the entire interface. Color identifies an active route, project, or interaction.

The system combines editorial scale with technical precision. The code-rendered portrait, project accordion, build trace, capability map, and case-study log are different instruments inside the same visual world.

**Key Characteristics:**

- Oversized grotesk typography with compact mono readings
- Black and warm-paper fields divided by thin rules
- Real project screens and authored editorial images at useful scale
- Sparse signal colors tied to state or project identity
- One explanatory scroll sequence, with direct interactions elsewhere

The authored media is part of the shipped world. The identity-preserving hero source ships as `public/editorial/portrait-screenprint-480.webp`, but it is sampled only as an offscreen luminance map for the visible canvas portrait. Working-system compositions use responsive WebP sources sized to their rendered surfaces.

## Colors

Ink and warm paper form the base. White is reserved for high-contrast text and frames. Blue, yellow, coral, mint, and violet identify active signals and never fill an entire page section.

### Primary

- **Ink:** the main dark field, text, and active-row surface.
- **Warm Paper:** the main light field and inverse text color.

### Secondary

- **Electric Blue:** navigation focus, project signals, and selected technical states.
- **Signal Yellow:** active route markers and precise typographic punctuation.
- **Hot Coral:** scroll progress, hero punctuation, and urgent route state.

### Tertiary

- **Acid Mint:** availability and database signals.
- **Violet:** UEvent identity and selected project framing.

### Neutral

- **White:** high-contrast text and media borders on fixed ink surfaces.

**The Signal Minority Rule.** Saturated color occupies a minority of every viewport. It marks state or identity and does not become the background of a whole section.

## Interaction & Motion

The interaction system behaves like a signal being acquired, routed, and confirmed. Motion explains continuity first and adds character second.

- **Route signal:** internal page changes replace the old page immediately and reveal the incoming page from the top edge while the four signal channels briefly resolve across that edge. Navigation never waits for the motion.
- **Theme signal:** theme changes radiate from the control that caused them, keeping the relationship between action and result visible.
- **Direct instruments:** project panels, system tabs, the build log, demo devices, the particle portrait field, and gallery frames change in place. Arrow-key navigation mirrors click and touch behavior where the control is a tab or accordion set.
- **Long-page orientation:** a discreet desktop section index shows the active reading position and reveals labels only on hover or focus.
- **Feedback:** meaningful actions answer immediately—copy confirms in place, selected media resolves with a clipped signal transition, and gallery inspection supports arrows, Escape, and touch swipes.
- **Motion budget:** route and theme transitions are the authored focal motions. Project media depth is fine-pointer only; all continuous rails pause while the page is hidden and on direct user focus or hover.
- **Summoned canvas:** a transparent Canvas 2D signal layer remains visually empty at rest. It wakes only around marked controls, pointer travel over evidence, direct presses, or brief scroll velocity, then clears itself. Lines inherit the project or responsibility color of the nearby instrument.
- **Purpose-built WebGL instruments:** selected project media gains a restrained inspection lens. Working-system imagery uses a tile ripple for interface systems, a particle reveal for service layers, and a decrypt field for data and tooling. Effects load only on large fine-pointer screens, pause outside the viewport, and sit over an intact HTML image fallback on touch, coarse-pointer, small-screen, unsupported, and reduced-motion contexts. Ordinary section headings remain still.
- **Transition language:** the initial loading field assembles once, and route snapshots fold before the next page resolves. Sections themselves remain stable as the reader scrolls. Native document scrolling and semantic source order remain untouched; reduced-motion removes the remaining transitional fields.
- **Section continuity:** sections and their headings remain visually fixed during reading. The hero title keeps the only typographic signal split.
- **Proximity and inspection:** nearby controls resolve a one-pixel outline before hover; evidence frames expose a pointer-following inspection crosshair and localized crop origin; project media gains shallow physical depth. Touch keeps the direct tap, swipe, accordion, and tab responses without simulating hover.
- **Reduced motion:** removes route, theme, depth, panel, gallery, and rail animation while preserving every state change and destination.

## Typography

**Display Font:** Cabinet Grotesk with Archivo and Arial delivery fallbacks  
**Body Font:** Cabinet Grotesk with Archivo and Arial delivery fallbacks  
**Label/Mono Font:** IBM Plex Mono

Cabinet Grotesk supplies broad, forceful headlines and compact project names. IBM Plex Mono is limited to navigation, status, years, indices, and technical measurements.

### Hierarchy

- **Display** (800, fluid 3.5rem to 6rem, 0.86): supporting display statements and compact utility routes.
- **Headline** (800, fluid 3.25rem to 6rem, 0.9): major home and case-study sections.
- **Title** (800, 2rem to 4rem, about 0.9): projects, capabilities, timeline events, and build phases.
- **Body** (500, 17px to 21px, 1.5 to 1.65): factual explanations with a measure near 60 characters.
- **Label** (600, about 11px, 0.12em tracking, uppercase): project state, dates, navigation, and layer names.
- **Project Hero** (800, fluid 4.5rem to 8rem, 0.82): the case-study title, deliberately below the homepage role scale.
- **Case-study Primary** (800, fluid 2.75rem to 4.5rem, 0.88): pivotal narrative moments such as product scope, working proof, and decisions.
- **Case-study Supporting** (800, fluid 2.5rem to 3.75rem, 0.9): stack and gallery headings that organize evidence without competing with it.

**The Two-Line Role Rule.** The role occupies two lines in the first viewport. Supporting copy stays to one sentence.

## Layout

The canvas tops out at 1600px. Outer padding is 20px on mobile, 32px on tablet, and 48px on desktop. Major sections use 112px of vertical space on mobile and about 160px on desktop.

Desktop composition uses a 12-column editorial grid. Featured projects expand inside a horizontal accordion, leaving the inactive project names visible as vertical tabs. Case-study logs use a four-column sticky summary and eight-column record. Borders, rather than card gaps, establish grouping.

Mobile uses a related but purpose-built composition rather than stacked desktop instruments. Selected work becomes a horizontal project index with one focused evidence panel; ownership layers and galleries become touch-first snap sequences; stack categories and demo devices become horizontal control strips above their content. Case-study media leads its controls, dense metadata is progressively reduced, and all targets remain at least 44px. The reading order stays role → work → capability → system → contact on the homepage and premise → scope → working proof → decisions → system → evidence on case studies.

## Elevation & Depth

The interface is flat by default. Tonal inversion, overlap, crop, and borders create depth. The canvas portrait behaves like a technical instrument embedded in the page, while the secondary project screenshot may use a soft ambient shadow because it behaves like a physical print. There are no glow halos or glass surfaces.

**The Evidence Above Chrome Rule.** A real image, diagram, or demonstration occupies the focal media area. Decorative UI chrome never substitutes for missing evidence.

## Shapes

Most structural regions have square corners. One-pixel and two-pixel rules organize panels. Circles are reserved for directional controls, theme switching, icon containers, and image-gallery navigation. Large rounded cards are absent.

## Components

### Buttons

- **Shape:** typographic links use a bottom rule; compact directional actions use a 44px circle.
- **Primary:** ink on paper or paper on ink, with project color reserved for the signal marker.
- **Hover / Focus:** arrows rotate or lift briefly; color and transform transitions stay under 300ms; focus uses a three-pixel ring.

### Cards / Containers

- **Corner Style:** square.
- **Background:** paper or ink, chosen by section rhythm.
- **Shadow Strategy:** none for structural containers.
- **Border:** one-pixel or two-pixel current-color rules.
- **Internal Padding:** 20px to 32px.

### Inputs / Fields

- **Style:** square, transparent or ink surfaces with clear bottom rules.
- **Focus:** the shared high-contrast ring remains visible.
- **Error / Disabled:** text and border state must name the problem without relying on color alone.

### Navigation

The fixed header combines the MK mark, compact identity reading, mono route labels, availability, theme control, and a one-pixel coral scroll-progress signal. Mobile opens a full ink index with large typographic destinations.

### Project accordion

Project tabs expand on hover, focus, or click. The active panel contains the title, factual summary, layered project imagery, technologies, source link, and case-study action. Inactive project names remain visible for direct comparison and navigation.

### Code-rendered portrait

The visible portrait is a canvas-generated halftone and ASCII particle field derived from an offscreen luminance sample. Density-sized print particles preserve the face, glasses, hair, and shoulders while selected dark regions resolve into sparse code glyphs. A restrained red-and-blue registration fringe connects the resting print to the interactive color system. Fine-pointer proximity displaces local particles; click or tap sends a four-color reconstruction pulse through the face before every particle returns to its registered position. Touch retains the tap response, and reduced-motion renders the stable portrait without displacement.

### Closing route

The footer is one compact ink field rather than a row of competing panels. The highest-priority case study owns the dominant upper plane, identified by a thin four-channel signal rule and a clear project reading. One short working principle and the back-to-top control share a quieter utility row below it; the identity mark is intentionally omitted because the preceding contact section has already established the person.

### Portfolio journey

The case-study hero records unique project visits in local browser storage and separates the current project rank from actual portfolio progress. Its signal bar fills as each new case study is opened. After all six have been opened and the visitor reaches the end of the final one, a one-time ink completion field thanks them, resolves the four signal colors across the top edge, and routes to contact after a short readable pause. Reduced-motion mode preserves the message and redirect while removing the entrance choreography.

## Do's and Don'ts

### Do:

- **Do** lead with the role and real work.
- **Do** use one project color at a time and tie it to state.
- **Do** use real screenshots, diagrams, recordings, and authored editorial assets.
- **Do** preserve keyboard, touch, and reduced-motion behavior for every interactive instrument.
- **Do** change content in place when that makes comparison faster.

### Don't:

- **Don't** use gradients, glass, decorative blobs, emoji, or glow effects.
- **Don't** fill entire sections with saturated color.
- **Don't** return to a repeated grid of rounded feature cards.
- **Don't** turn project claims into unsupported metrics or marketing copy.
- **Don't** scatter scroll effects through the page. Keep the build trace as the single explanatory sequence.
