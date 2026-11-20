import type { PointerEvent } from 'react'

type SvgPointerEvent = PointerEvent<SVGSVGElement>

/**
 * Pointer handlers for an <svg> that call `onDrag` when pressed and while
 * dragging (mouse and touch). Pair with the `draggable` CSS class.
 */
export function dragHandlers(enabled: boolean, onDrag: (event: SvgPointerEvent) => void) {
  return {
    onPointerDown: (event: SvgPointerEvent) => {
      if (!enabled) return
      event.currentTarget.setPointerCapture(event.pointerId)
      onDrag(event)
    },
    onPointerMove: (event: SvgPointerEvent) => {
      if (enabled && event.currentTarget.hasPointerCapture(event.pointerId)) onDrag(event)
    },
  }
}

/**
 * Converts a distance along a track of `length` (in viewBox units) into a whole
 * number from 0 to `max`, clamped to the ends of the track.
 */
export function toScale(distance: number, length: number, max: number) {
  return Math.round(Math.min(1, Math.max(0, distance / length)) * max)
}

/** Pointer position in the svg's viewBox coordinates (viewBox starting at 0 0). */
export function pointerInViewBox(event: SvgPointerEvent, width: number, height: number) {
  const rect = event.currentTarget.getBoundingClientRect()
  return {
    x: ((event.clientX - rect.left) / rect.width) * width,
    y: ((event.clientY - rect.top) / rect.height) * height,
  }
}
