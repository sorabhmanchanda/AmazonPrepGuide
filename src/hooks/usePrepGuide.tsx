import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type GuideCtx = {
  markdown: string
  loading: boolean
  error: string | null
}

const Ctx = createContext<GuideCtx | null>(null)

export function PrepGuideProvider({ children }: { children: ReactNode }) {
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}content/prep-guide.md`)
        if (!res.ok) throw new Error(`Failed to load guide (${res.status})`)
        const text = await res.text()
        if (!cancelled) {
          setMarkdown(text)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load guide')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => ({ markdown, loading, error }), [markdown, loading, error])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePrepGuide() {
  const v = useContext(Ctx)
  if (!v) throw new Error('usePrepGuide must be used within PrepGuideProvider')
  return v
}
