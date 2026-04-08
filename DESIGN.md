# Design Brief

## Direction

**Fake Review Detection System** — A professional, intelligent dashboard for review analysis with cybersecurity-inspired visual language and data-analytics clarity.

## Tone

Deep, trustworthy, and analytical — combining dark enterprise UI patterns with precise teal/green/red feedback signals to convey credibility and confidence in ML predictions.

## Differentiation

Truth signals hierarchy: vibrant green for "Real" reviews, crisp red for "Fake," electric teal for confidence metrics and data drill-downs — creating instant visual parsing of prediction outcomes.

## Color Palette

| Token      | OKLCH         | Role                                    |
| ---------- | ------------- | --------------------------------------- |
| background | 0.12 0.01 260 | Dark navy base (near-black)             |
| foreground | 0.92 0.01 260 | High-contrast text                      |
| card       | 0.16 0.015 260| Elevated content surfaces               |
| primary    | 0.75 0.18 180 | Teal accent (confidence, interactions)  |
| accent     | 0.75 0.18 180 | Highlights, active states               |
| muted      | 0.22 0.018 260| Secondary surfaces, disabled states     |
| destructive| 0.65 0.19 22  | Fake label red                          |
| success    | 0.65 0.18 145 | Real label green                        |

## Typography

- Display: Space Grotesk — modern tech aesthetic for headings and dashboard titles
- Body: DM Sans — clean, readable, neutral for data-heavy UI
- Mono: JetBrains Mono — code/confidence scores
- Scale: hero `text-4xl md:text-5xl font-bold`, section `text-2xl font-semibold`, label `text-sm font-semibold tracking-wide`

## Elevation & Depth

Minimal shadow hierarchy using subtle borders and card layering: card background elevated 0.04L above base, with thin border-color stroke at 0.26 L for surface definition. Shadows reserved for tooltips/popovers only.

## Structural Zones

| Zone    | Background         | Border              | Notes                                              |
| ------- | ------------------ | ------------------- | -------------------------------------------------- |
| Header  | sidebar (0.14L)    | border-color        | Sidebar fixed, contains logo + nav items           |
| Content | background (0.12L) | none                | Main dashboard area with card-based sections      |
| Section | card (0.16L)       | border-color subtle | Analytics cards, review tables, upload areas      |
| Footer  | muted (0.22L)      | border-top subtle   | Info/credits, minimal visual weight               |

## Spacing & Rhythm

Gap-based grid with consistent 4px baseline: section gaps 6rem, card padding 1.5rem, content sections use 3rem vertical rhythm. Card-to-card spacing 1rem for grouped clusters.

## Component Patterns

- Buttons: Teal primary bg, white text, rounded-lg, hover +5% lightness / Red destructive for fake actions
- Cards: 0.16L bg, thin border-color, no shadow, rounded-lg, hover scale-105 light transform
- Badges: Real = green (0.65 L, 18% C, 145 H), Fake = red (0.65 L, 19% C, 22 H), inline-flex micro-spacing
- Tables: Light alternating row bg using muted/0.2L, confidence bars as inline chart elements

## Motion

- Entrance: Fade + slide-up 300ms ease-out on page load (Recharts charts animated)
- Hover: Button scale 102%, card lift shadow-sm, text brightness +3%
- Chart animation: 800ms staggered bar/pie animations on mount, smooth transitions between predictions

## Constraints

- No full-page backgrounds or gradients — use layered card structure
- Confidence scores always use teal accent (primary)
- Truth signals (Real/Fake) never mixed: green XOR red, never orange/yellow
- All interactive text underlined or badge'd to prevent ambiguity

## Signature Detail

Teal accent bar accent on active nav items and prediction confidence indicators — a subtle 3px left/top border that ties data insights to interaction state.
