# Context Capsule: Abhiraj Kochale Portfolio (v4.0)

## 1. Project Overview
A highly professional, "Awwwards-tier" developer portfolio built with a **Light Editorial Brutalist** aesthetic. The focus is on stark, high-contrast typography, precise grid alignments, and high-performance scroll-linked animations, completely avoiding generic "vibe-coded" tutorial tropes (e.g., no floating orbs, glows, or unnecessary borders).

## 2. Core Technologies
*   **Framework:** React + TypeScript + Vite
*   **Styling:** Vanilla CSS (Strict Token System)
*   **Animation Engine:** GSAP & ScrollTrigger
*   **Text Animation:** SplitType
*   **Smooth Scrolling:** Lenis (Synchronized with `gsap.ticker` in `main.tsx`)

## 3. Design System & Strict Rules
**Color Palette (Light Brutalism):**
*   `--bg`: `#F5F2EC` (Warm off-white base)
*   `--bg-2`: `#EDEAE3` (Hover states)
*   `--text`: `#0D0D0D` (Near-black primary text)
*   `--text-2`: `#6B6560` (Warm grey secondary)
*   `--text-3`: `#B0ABA4` (Muted labels/tertiary)
*   `--border`: `#D8D4CC` (Default 1px borders)

**Typography:**
*   **Headers/Display:** Playfair Display (`--serif`) - Used for high-impact, bold statements with tight tracking.
*   **Body/UI/Labels:** Inter (`--sans`) - Used for all metadata, tags, eyebrows, and paragraphs.

**Strict Visual Constraints:**
*   **Border-Radius:** Exactly `0px` on all structural elements, cards, and buttons. Exceptions are limited strictly to micro-UI elements (e.g., the green `Available` dot).
*   **No Gradients or Glows:** Flat, solid colors only.
*   **Borders:** Sections, grid items, and rows are separated by harsh `1px solid var(--border)` lines.

## 4. Animation Architecture (GSAP)
*   **Interior Element Scrubbing:** Elements inside sections (stats, cards, rows) use a scroll-linked `scrub: 1` animation. They typically fade in (`opacity: 0`) and move from downwards to upwards (`y: 60` or `y: 80` to `y: 0`).
*   **Section Wrapper Reveal:** In `App.tsx`, all `<div className="page-section">` wrappers have a ScrollTrigger applied that alternates horizontal sliding (`x: -120` for evens, `x: 120` for odds) with a fade-in, tied perfectly to the scroll (`scrub: 1`).
*   **Hero Section:** Features a `240vh` sticky pin. Uses a GSAP timeline to scale the text outward (`scale: 11`) creating a window effect as the user scrolls down, accompanied by rotated edge text on the far left and right.

## 5. File Structure & Component Patterns
*   **`App.tsx`**: Orchestrates the main layout and applies the global horizontal-scrub entrance animation to all `.page-section` wrappers.
*   **`index.css`**: Holds all CSS variables, resets, and the global `.section` and `.eyebrow` module styling.
*   **Eyebrow Module:** Every section starts with a standardized eyebrow layout (`01 / About`, `02 / Experience`), styling driven by `index.css`.
*   **Grid Systems:** CSS Grid is heavily utilized. The `Projects` and `Certifications` sections use a `1px gap` hack over a `var(--border)` background to create perfectly crisp 1px borders between bento-grid cards.

## 6. Development Rules for Future Agents
1.  **NEVER** introduce border-radius, shadows, or gradients.
2.  **ALWAYS** use the established CSS variables (`var(--bg)`, `var(--text)`, etc.) — no hardcoded colors.
3.  **PRESERVE** the existing GSAP `ScrollTrigger` instances; if animating a new element, ensure it uses `scrub: 1` and matches the existing timing/easing paradigms.
4.  Maintain the `Playfair` vs `Inter` typography contrast. Display text is Serif; Metadata/Tags are Sans-serif uppercase with wide letter-spacing (`0.14em`+).
