---
name: AGSIT service pages
description: Deep ink and signal cyan with a serif display voice, where a page reads as a route of stations.
colors:
  ink: "#020712"
  navy: "#08152b"
  cyan: "#41c8f6"
  cyan-soft: "#8be2ff"
  teal-on-paper: "#1f6f92"
  title-blue: "#253f6c"
  paper: "#f6fafe"
  white: "#ffffff"
  muted-on-ink: "rgba(180, 197, 219, 0.88)"
  muted-on-paper: "rgba(8, 21, 43, 0.74)"
  hairline-on-ink: "rgba(242, 248, 255, 0.16)"
  hairline-on-paper: "rgba(37, 63, 108, 0.2)"
typography:
  display:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(3.35rem, 4.4vw, 5rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "0"
  headline:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.4rem, 3.5vw, 3.8rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "0"
  title:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.35rem, 5vw, 1.9rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0"
  body:
    fontFamily: "'Inter', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.2rem)"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "'Inter', 'Segoe UI', Tahoma, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0.12em"
rounded:
  frame: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  panel-pad: "clamp(12px, 2.6svh, 36px)"
  stack-gap: "clamp(10px, 2svh, 24px)"
  shell: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
  chip-term:
    backgroundColor: "transparent"
    textColor: "{colors.cyan-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px 6px 10px"
  media-frame:
    backgroundColor: "{colors.navy}"
    rounded: "{rounded.frame}"
  route-bar:
    backgroundColor: "rgba(2, 7, 18, 0.95)"
    textColor: "{colors.muted-on-ink}"
    height: "60px"
---

# Design System: AGSIT service pages

## Overview

**Creative North Star: "The Process Route"**

A service page is read the way a process is read: as stations on one continuous line. Each screen is a station, and the line is always in view. The mood is calm and exact, with the serif display voice of an editorial page over the deep ink of a control room. Nothing decorates; every mark either says where you are or what you can do next.

The system is dark by default because these pages are read in focused sessions on screens of every size, and it opens to a pale paper ground only for the passages about the reader's own situation and outcome. Cyan is the single signal color. Depth comes from tonal layers, hairlines and one soft shadow, never from texture.

Confirmed visual rejections: no background grids or vertical-line patterns, no hand-drawn strokes, no grids of identical cards.

**Key Characteristics:**
- One route per page: thin-ring start, dot stations, heavy-ring end, joined by a 2px line.
- Ink and navy grounds with paper interludes; cyan is used for position and action only.
- Serif display for sentences, sans body for reading; titles are full sentences.
- Every panel is exactly one screen high; copy is written to fit before type is shrunk.
- Motion follows the route: lines draw, nodes arrive, panels enter in their own way.

## Colors

A near-black blue ground, one bright signal, and a cool paper for quiet passages.

### Primary
- **Signal Cyan** (#41c8f6): position and action on ink: the current station, filled route nodes, route progress, the primary button, links.
- **Pale Signal Cyan** (#8be2ff): secondary signal on ink: small labels, the "back" link, focus rings.

### Secondary
- **Paper Teal** (#1f6f92): the signal on paper grounds, where cyan fails contrast (5.3:1 on paper). Nodes, labels and arrows on light panels.

- **Title Blue** (#253f6c): titles on paper panels; the same strong blue the site uses for its contact title (9:1 on paper).

### Neutral
- **Deep Control-Room Ink** (#020712): main ground of hero, services and the route bar.
- **Night Navy** (#08152b): alternate dark ground for the method and "more services" panels, media frames and button text.
- **Cool Paper** (#f6fafe): light ground for the situation and result panels.
- **Muted on Ink** (rgba(180, 197, 219, 0.88)): body copy on dark, tinted from the ground rather than gray.
- **Muted on Paper** (rgba(8, 21, 43, 0.74)): secondary text on paper.
- **Hairlines** (rgba(242, 248, 255, 0.16) on ink, rgba(37, 63, 108, 0.2) on paper): 1px dividers and the only edge treatment.

### Named Rules
**The Signal Rule.** Cyan appears only where it marks position or invites action. If it is decoration, remove it.
**The Paper Rule.** Paper panels speak about the reader (their situation, their result); services and method stay on ink. Titles on paper are Title Blue and the accent on paper is always Paper Teal.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif)
**Body Font:** Inter (with Segoe UI, Tahoma, sans-serif)

**Character:** A light, high-contrast serif carries every sentence-length title; a sturdy sans carries reading text and small labels. Both are the site's own faces.

### Hierarchy
- **Display** (300, clamp(3.35rem, 4.4vw, 5rem) on wide screens, 1.9–3.25rem on phones, 0.98): the page promise, two lines.
- **Headline** (300, clamp(2.4rem, 3.5vw, 3.8rem) on wide screens, 1.5–2.3rem on phones, 1.04): panel titles; statement panels run 1.22× larger on roomy screens.
- **Title** (400, clamp(1.35rem, 5vw, 1.9rem), 1.1): method steps, before/after results, sibling service names.
- **Body** (500, clamp(1rem, 1.2vw, 1.2rem), 1.55): reading text, capped at 60ch.
- **Label** (800, 0.78rem, tracking 0.12em, uppercase): small tags such as "What you get" and the technical-name chip.

### Named Rules
**The Sentence Rule.** Titles are complete sentences a non-specialist can read aloud; technical names live in chips and labels.

## Layout

Each section is one panel exactly one screen tall (`--app-panel-h`), padded by the header height above and the route bar below, so no content sits under the menu. Content lives in a 1240px shell with a fluid gutter (clamp(20px, 5vw, 72px)). Layouts are two columns on landscape and wide screens and one column in portrait up to 1023px; extra rules trim spacing and hide secondary lines on short screens (phones held sideways, laptop windows under 620px tall). An audit across 22 screen sizes (phones from 320px, tablets, laptops, desktops to 2560px, portrait and landscape) confirmed no panel overflows.

Spacing is fluid and height-aware: panel padding clamp(12px, 2.6svh, 36px), stack gap clamp(10px, 2svh, 24px). Consecutive service panels swap which side the frame sits on to keep rhythm.

## Elevation & Depth

Tonal layering, not shadow: ink, navy and paper grounds separate the panels, and 1px hairlines separate content within them. The only shadow is the soft, offset drop under a media frame (`0 24px 48px rgba(0, 0, 0, 0.34)`). The route bar sits on a translucent ink plate with a hairline on its top edge.

### Named Rules
**The Flat Panel Rule.** Panels have no cards, borders or shadows around their content. Structure comes from spacing and hairlines.

## Shapes

Geometry is the diagram vocabulary: circles for nodes, straight 2px lines for routes, 1px hairlines for dividers. Frames use a 14px corner; button and chip are full pills. Nothing is clipped into organic contours.

## Components

### Buttons
- **Shape:** full pill (999px), 48px tall.
- **Primary:** Signal Cyan fill with Night Navy uppercase label (weight 900, tracking 0.1em), 22px side padding.
- **Hover / Focus:** hover turns the fill white and lifts 2px; focus shows a 3px Pale Signal Cyan outline with 3px offset.

### Chips
- **Style:** the technical-name chip: transparent, 1px cyan border at 42%, Pale Signal Cyan uppercase label, a small filled cyan node at its start.

### Media frame
- **Corner Style:** 14px. Night Navy diagonal gradient, 1px pale-cyan hairline at 18%, soft drop shadow.
- **Empty state:** the technical name set in light italic serif at 24% cyan until the real image is supplied. The image, when present, fills the frame edge to edge.

### Navigation
- **Route bar (signature):** a fixed dark dock at the bottom edge, 60–64px tall (36px on phones held sideways). A 2px track with cyan fill runs behind one node per station. The current node is enlarged with a white edge and an outlined ring; done nodes are filled cyan; upcoming nodes are hollow. On screens 1200px and wider every station is labeled; below that a single line shows the current station and a count. It is hidden on the hero and over the contact section.
- **Hero route (signature):** the page's services drawn as a vertical route: a thin-ring start node with an italic serif state, filled dot nodes with the technical name and a one-line plain description, and a heavy-ring end node. Its line draws itself node by node on entry.
- **Link rows:** full-width rows divided by hairlines: serif name, one plain line beneath, a cyan arrow that nudges right on hover.

### Motion
Entrances use opacity plus a transform that differs by panel (rise for hero, slide in from the right for situation, none for method steps, scale for media, slide from the left for results). The route is the authored moment: hero and method lines draw, nodes arrive with a small overshoot. Easing is exponential ease-out. Nothing is hidden unless the scroll controller is running, and reduced-motion users get native scrolling with all content visible.

## Do's and Don'ts

### Do:
- **Do** keep every panel one screen high and write copy to fit before shrinking type below its floor.
- **Do** use Paper Teal (#1f6f92) for accents on paper; cyan on paper fails contrast.
- **Do** give a service without an image a typographic frame, never a stock picture or a gradient stand-in.
- **Do** keep body copy at 60ch or less and explain every technical term in plain words on first use.
- **Do** keep the route bar on a dark plate on any ground so the current station is always legible.

### Don't:
- **Don't** use background grids, repeating vertical lines or any texture pattern.
- **Don't** use hand-drawn strokes or scribbles; diagrams are straight lines and circles.
- **Don't** lay services or steps out as grids of identical cards.
- **Don't** add testimonials, FAQ blocks, prices or numbers the business cannot substantiate.
- **Don't** hide navigation or content behind animation: the page must read fully with motion reduced.
