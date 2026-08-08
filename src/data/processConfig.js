// Kept separate on purpose: this is the one section most likely to be tuned.
// Values match the approved vanilla reference implementation.
export const processConfig = {
  firstGap: { factor: 0.09, min: 120, max: 180 },
  spacing: { factor: 0.255, min: 360, max: 440 },
  endGap: { factor: 0.14, min: 190, max: 280 },
  travelExtra: { factor: 0.035, min: 36, max: 72 },
  scrollMultiplier: 1.28,
  smoothing: 0.11,
  lowerY: [-38, 0, -48, 0, -42],
  upperY: [0, 42, 0, 48, 0],
}
