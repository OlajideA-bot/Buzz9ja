const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>"

const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`

export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" style={{ backgroundImage: NOISE_URL }} />
}
