# Portfolio UI quality gate

Use this rule for UI implementation, responsive review, accessibility work,
animation, or visual polish.

## Workflow

1. Identify the visitor's primary question or action on the surface.
2. Inspect the nearest existing component, token, and content pattern.
3. Implement the complete state, including long copy, missing media, disabled
   controls, and errors where the surface can produce them.
4. Check semantics, keyboard behavior, focus, contrast, touch targets, and
   reduced motion while building.
5. Render meaningful visual changes at mobile and desktop widths. Fix the
   issues together, then do at most one confirmation pass.

## Visual and content rules

- Reuse CSS variables, Tailwind utilities, component variants, and existing
  layout rhythms before creating new values.
- Use hierarchy and whitespace before adding another card, border, glow, or
  decorative background.
- Keep text readable and controls stable at narrow widths. Avoid accidental
  horizontal scrolling.
- Motion should explain entry, navigation, selection, or state change. Avoid
  decorative motion that competes with project content.
- Keep headings and summaries concrete. Portfolio copy must be supported by
  source data or evidence supplied by the user.
- Optimize media deliberately: correct dimensions, descriptive alternative
  text when informative, and empty alt text when decorative.

## Rendered verification

Use Browser, Chrome, or Playwright when a change affects a page, responsive
layout, dialog, drawer, navigation, animation, focus behavior, or a visual bug.
For copy-only or non-rendered logic changes, the focused code checks are enough.

Before handoff, confirm visual consistency, content truthfulness, responsive
behavior, accessibility basics, and the exact checks that were run.
