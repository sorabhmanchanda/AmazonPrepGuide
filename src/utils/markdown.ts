/**
 * Extract one top-level guide section by number (matches headings like `# 1. ...`).
 */
export function extractGuideSection(fullMarkdown: string, sectionNumber: number): string {
  const re = new RegExp(`^#\\s+${sectionNumber}\\.\\s.*$`, 'm')
  const m = fullMarkdown.match(re)
  if (!m || m.index === undefined) {
    return '_Section not found in guide._'
  }
  const start = m.index
  const nextRe = new RegExp(`\\n#\\s+${sectionNumber + 1}\\.\\s`, 'm')
  const tail = fullMarkdown.slice(start + 1)
  const next = tail.search(nextRe)
  if (next === -1) {
    return fullMarkdown.slice(start).trim()
  }
  return fullMarkdown.slice(start, start + 1 + next).trim()
}

export function stripLeadingH1(md: string): string {
  return md.replace(/^#\s+.+\n+/, '')
}
