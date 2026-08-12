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
typography:
  scale:
    micro: '0.6rem'
    microCompact: '0.61rem'
    microLabel: '0.62rem'
    microProject: '0.64rem'
    label: '0.68rem'
    contactEmailMin: '2.1rem'
    emailRailMin: '2.35rem'
    heroMin: '3.2rem'
    displayMin: '3.65rem'
    contactMin: '4rem'
    contactEmailMax: '6.5rem'
    headlineMax: '8rem'
    heroMax: '9.5rem'
    contactQuestionMax: '10rem'
    displayMax: '11rem'
  display:
    fontFamily: 'Cabinet Grotesk, Archivo, Arial, sans-serif'
    fontSize: 'clamp(3.65rem, 12vw, 11rem)'
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
    fontSize: 'clamp(3.2rem, 8.7vw, 9.5rem)'
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

The system combines editorial scale with technical precision. The screen-print portrait, project accordion, build trace, capability map, and case-study log are different instruments inside the same visual world.

**Key Characteristics:**

- Oversized grotesk typography with compact mono readings
- Black and warm-paper fields divided by thin rules
- Real project screens and authored editorial images at useful scale
- Sparse signal colors tied to state or project identity
- One explanatory scroll sequence, with direct interactions elsewhere

The authored media is part of the shipped world: `public/editorial/interface-workshop.webp` is the assembly still life in the capability map, and `public/editorial/portrait-screenprint.webp` is the identity-preserving hero portrait. Both were generated in `stylized-concept` mode and optimized to WebP.

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

## Typography

**Display Font:** Cabinet Grotesk with Archivo and Arial delivery fallbacks  
**Body Font:** Cabinet Grotesk with Archivo and Arial delivery fallbacks  
**Label/Mono Font:** IBM Plex Mono

Cabinet Grotesk supplies broad, forceful headlines and compact project names. IBM Plex Mono is limited to navigation, status, years, indices, and technical measurements.

### Hierarchy

- **Display** (800, fluid 3.4rem to 10.6rem, 0.78): the role, project name, next-project route, and 404 state.
- **Headline** (800, fluid 3.5rem to 8rem, 0.88): major home and case-study sections.
- **Title** (800, 2rem to 4rem, about 0.9): projects, capabilities, timeline events, and build phases.
- **Body** (500, 17px to 21px, 1.5 to 1.65): factual explanations with a measure near 60 characters.
- **Label** (600, about 11px, 0.12em tracking, uppercase): project state, dates, navigation, and layer names.

**The Two-Line Role Rule.** The role occupies two lines in the first viewport. Supporting copy stays to one sentence.

## Layout

The canvas tops out at 1600px. Outer padding is 20px on mobile, 32px on tablet, and 48px on desktop. Major sections use 112px of vertical space on mobile and about 160px on desktop.

Desktop composition uses a 12-column editorial grid. Featured projects expand inside a horizontal accordion, leaving the inactive project names visible as vertical tabs. Case-study logs use a four-column sticky summary and eight-column record. Borders, rather than card gaps, establish grouping.

Mobile turns split instruments into a clear sequence. Project panels stack vertically, case-study media becomes full width, and all targets remain at least 44px.

## Elevation & Depth

The interface is flat by default. Tonal inversion, overlap, crop, and borders create depth. The screen-print portrait and secondary project screenshot may use a soft ambient shadow because they behave like physical prints placed over the composition. There are no glow halos or glass surfaces.

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

### Screen-print portrait

The portrait uses three horizontal image slices. Fine-pointer movement shifts those slices by a few pixels and returns them with an exponential ease. Touch and reduced-motion users receive the intact image.

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
