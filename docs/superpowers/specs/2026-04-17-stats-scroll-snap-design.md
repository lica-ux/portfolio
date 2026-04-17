# Design: StatsSection scroll-snap (desktop)

**Date:** 2026-04-17

## Goal

When the user scrolls through the StatsSection on desktop, each stat text should snap to the center of the screen and stop there before the next scroll moves to the next stat.

## Scope

Desktop layout only (`md:flex`). Mobile layout (`md:hidden`) is unchanged.

## Layout changes

### Outer wrapper

Before: `min-height: ${STATS.length * 100}svh` (= 400svh)  
After: `height: 100svh`

The section no longer occupies a tall scroll area in the page flow. It is a fixed-height viewport frame.

### Left column (image)

Before: `w-1/2 sticky top-0 p-4 md:p-10` with `height: 100svh`  
After: `w-1/2 h-full p-4 md:p-10`

No longer needs `position: sticky` — the container itself is 100svh tall.

### Right column

Before: `w-1/2 flex flex-col`  
After: `w-1/2 h-full overflow-y-scroll snap-y snap-mandatory`

The right column becomes a self-contained scroll container. Scrollbar is hidden via CSS (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).

### Each stat div

Before: `flex items-center px-[10%]` with `height: 100svh`  
After: `h-full flex items-center px-[10%] snap-start snap-always`

Each stat div fills the scroll container's full height. `snap-start` places the snap point at the top of each div (which puts the vertically-centered text at the viewport midpoint). `snap-always` prevents skipping snap points.

## JS changes

The scroll event listener in `useEffect` moves from `window` to the right column DOM element.

- Add `const rightColRef = useRef<HTMLDivElement>(null)` to the component
- Attach `ref={rightColRef}` to the right column div
- In `useEffect`, replace `window.addEventListener('scroll', onScroll)` with `rightColRef.current?.addEventListener('scroll', onScroll)`
- Replace `window.removeEventListener('scroll', onScroll)` with `rightColRef.current?.removeEventListener('scroll', onScroll)`

`getBoundingClientRect` continues to work correctly — it returns viewport-relative coordinates regardless of which element is the scroll container.

`checkDesktopPositions` logic (30%–70% vh thresholds) is unchanged.

## CSS addition

In `src/index.css`, add a utility to hide the scrollbar on the right column:

```css
.stats-scroll-container {
  scrollbar-width: none;
}
.stats-scroll-container::-webkit-scrollbar {
  display: none;
}
```

Or add the class inline with Tailwind arbitrary variants if preferred.

## Behaviour summary

1. User scrolls normally to the StatsSection on the page.
2. Once the section is in view, subsequent scroll events are captured by the right column overflow container.
3. Each scroll snap-stops on a stat, centering the text in the viewport.
4. After the last stat, scroll propagates back to the page.
5. The fade-in/fade-out animation triggers exactly as before.

## Files affected

- `src/components/StatsSection/StatsSection.tsx` — layout + ref + scroll listener
- `src/index.css` — scrollbar-hiding CSS (or Tailwind arbitrary variant inline)
