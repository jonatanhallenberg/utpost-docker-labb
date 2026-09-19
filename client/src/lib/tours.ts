import type { TourLog } from '@utpost/shared'

/**
 * Summan av alla stigningar mellan två mätpunkter i följd.
 *
 * Punkter utan höjdvärde (elevation_m är null i databasen för en del punkter)
 * hoppas över: stigningen räknas mellan de närmaste punkterna som HAR ett värde.
 * Den gamla React-koden räknade `null - 120` och fick NaN – och visade "NaN höjdmeter".
 */
export const elevationGain = (logs: TourLog[]): number => {
  let gain = 0
  let previous: number | null = null
  for (const log of logs) {
    if (log.elevation_m === null) continue
    if (previous !== null && log.elevation_m > previous) gain += log.elevation_m - previous
    previous = log.elevation_m
  }
  return gain
}

/** 12 345 m → "12,3 km" – samma avrundning som React-appen, men med svenskt decimaltecken */
export const formatKm = (distanceM: number): string =>
  `${(Math.round(distanceM / 100) / 10).toLocaleString('sv-SE')} km`
