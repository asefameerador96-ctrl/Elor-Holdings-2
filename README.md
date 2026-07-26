# Motion Starter

A reusable starting point for scroll-driven, WebGL-backed sites. Next.js 16 (App
Router, Turbopack), React 19.2, Tailwind v4, GSAP ScrollTrigger, Lenis, Motion,
React Three Fiber.

The point of this template is that the tedious and easy-to-get-wrong parts are
already done — engine wiring, reduced-motion fallbacks, mobile GPU budgets — so a
new project starts at art direction instead of plumbing.

## Use it

```bash
# copy the folder, then:
npm install && npm run dev
```

Then replace, in roughly this order: the tokens in `globals.css`, the copy in
`src/components/sections/`, and the shader in `src/components/canvas/blob.tsx`.

## Layout

| Path | Role |
| --- | --- |
| `src/lib/motion.ts` | Easing/duration tokens. Every animation reads from here. |
| `src/components/smooth-scroll.tsx` | Lenis, driven by the GSAP ticker. Mounted once in the root layout. |
| `src/components/canvas/scene.tsx` | `ssr: false` boundary for the 3D bundle. |
| `src/components/canvas/blob.tsx` | Displacement vertex shader + fresnel fragment shader. |
| `src/components/ui/reveal.tsx` | The one entrance primitive. Use it instead of writing new ones. |
| `src/components/sections/` | Demo sections — delete these. |

## Decisions worth knowing before you edit

**One rAF loop.** GSAP's ticker drives Lenis (`autoRaf: false`), and Lenis's
scroll event drives `ScrollTrigger.update`. Two engines each running their own
loop is the usual cause of jittery pinned sections. Don't add a third.

**Reduced motion is enforced in JS, not just CSS.** A CSS media query cannot stop
a `requestAnimationFrame` loop. So `prefersReducedMotion()` is checked before
Lenis is constructed, before ScrollTrigger timelines are built, and the R3F canvas
switches to `frameloop="demand"` (one frame, then idle). The CSS block in
`globals.css` is the backstop, not the mechanism.

**Mobile gets a different scene, not the same scene smaller.** `(pointer: coarse)`
drops icosahedron detail from 64 to 24 (~40k tris to ~7k), caps DPR at 1.25, and
disables MSAA. A 3× DPR phone rendering the desktop scene is how these sites end
up at 12fps.

**Split text stays readable to screen readers.** The scrubbed word reveal in
`statement.tsx` keeps the real sentence in an `sr-only` paragraph and marks the
animated spans `aria-hidden`. Per-word spans without this are announced as
separate items.

**`scroll-behavior: smooth` is deliberately absent.** As of Next 16 the framework
no longer overrides it during navigation, so setting it would fight Lenis for
control of scroll position.

## Known state

- `npm run build`, `tsc --noEmit`, and `eslint` are all clean.
- `sharp` is pinned via `overrides` to ^0.35.3 (older releases bundle libvips with
  CVE-2026-33327/33328/35590/35591).
- `npm audit` still reports `brace-expansion` in the ESLint dependency chain.
  Forcing v5 breaks `minimatch@3` and ESLint stops running — verified. It is a
  build-time-only DoS in dev tooling and does not ship to the browser. Leave it
  until ESLint updates its own dependency.

## Still to do per project

Lighthouse CI, an OG image route, and real content. The demo sections are
scaffolding, not a design.
