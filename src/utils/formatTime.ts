export function formatSeconds(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function estimateSpeakingSeconds(wordCount: number, wpm = 140): number {
  return Math.round((wordCount / wpm) * 60)
}
