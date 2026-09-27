# Ocean background verification

## Implementation

- Seven scene palettes follow the shared active chapter state. Palettes fade over 800 ms; waves and object elements remain mounted.
- CSS/SVG handles waves, boats, basket boat and whale. Each boat separates horizontal drift from bobbing. Invisible objects pause their animation; mobile immediately hides outgoing objects to retain the two-object budget.
- Canvas uses elapsed time, a maximum of 12 particles / 30 FPS / DPR 1.5 below 768 px, and 32 particles / 60 FPS / DPR 2 otherwise. Particles stay near screen edges.
- The navigation pause button persists `sontra:ocean-paused`. Reduced motion, document visibility and the media modal also stop the background. Reduced motion switches scenes without transitions.
- Touch scrolling remains native, including long chapters and horizontal controls. Chapter selection compares all section positions at a viewport anchor rather than ranking partial IntersectionObserver callback entries. Navigation and background share this state.

## Verified

Baseline build and lint passed before edits. Final `npm.cmd run build` and `npm.cmd run lint` also passed.

`tests/ocean-background.browser.js` exports an async function accepting a Playwright Page already navigated to the app. It was executed through the available Playwright harness against Vite on port 5174, using an isolated headless Edge browser. No test framework was added to application dependencies.

Results:

- Widths 360, 390, 430, 844 (landscape) and 1440 px: no horizontal document overflow; Canvas resizes to its capped pixel dimensions.
- All seven scenes selected correctly by chapter scrolling, desktop dot navigation and free scrolling.
- Separate Chromium touch-event emulation traversed all seven chapters. The heritage carousel's basket-boat tab remained tappable and displayed the corresponding heading.
- Pause persisted after reload. Canvas made zero additional draws during each measured paused, modal-open, reduced-motion and synthetic-hidden interval.
- Reduced-motion CSS animation name was `none`; restoring normal motion resumed the background.
- At 390 px the measured Canvas draw rate was approximately 28.2 FPS over a 1.1-second headless sample. This is the background draw rate, not a whole-page performance benchmark.
- DPR 3 emulation at 390 × 844 produced a 585 × 1266 Canvas (DPR capped at 1.5). Landscape width 844 produced a 1688-pixel Canvas (DPR capped at 2).
- No page JavaScript errors were captured in the separate mobile, carousel and orientation test.
- Visually inspected mobile screenshots of the entrance, harbour and heritage scenes.

The initial interactive browser tab became hidden during automated checks. This correctly paused the Canvas; the repeatable suite therefore ran in a separate headless browser. The visibility regression uses a synthetic visibility event, not an operating-system app switch.

## Remaining physical-device acceptance

Android midrange hardware and Safari on an actual iPhone were not available. Check QR cold load, long reading sessions, touch scrolling, browser-toolbar expansion/collapse, app switching, orientation changes and battery/thermal behaviour on those devices before claiming physical-device FPS or Safari certification.
