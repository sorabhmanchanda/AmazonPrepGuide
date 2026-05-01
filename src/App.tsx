import { useLayoutEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PrepGuideProvider } from '@/hooks/usePrepGuide'
import { Layout } from '@/components/layout/Layout'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { applyThemeClass, useUIStore } from '@/store/useUIStore'
import { Dashboard } from '@/pages/Dashboard'
import { MarkdownSectionPage } from '@/pages/MarkdownSectionPage'
import { LeadershipPrinciplesPage } from '@/pages/LeadershipPrinciples'
import { StarStoriesPage } from '@/pages/StarStories'
import { PracticeQuizPage } from '@/pages/PracticeQuiz'
import { FinalChecklistPage } from '@/pages/FinalChecklist'
import { MockInterviewPage } from '@/pages/MockInterview'
import { MyNotesPage } from '@/pages/MyNotes'
import { InterviewPlaybookPage } from '@/pages/InterviewPlaybook'
import { JapanVsIndiaPage } from '@/pages/JapanVsIndia'
import { NetworkDesignMathPage } from '@/pages/NetworkDesignMath'
import { ExperienceTranslationPage } from '@/pages/ExperienceTranslation'

function ThemeSync() {
  const theme = useUIStore((s) => s.theme)
  useLayoutEffect(() => {
    applyThemeClass(theme)
  }, [theme])
  return null
}

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <ErrorBoundary>
      <PrepGuideProvider>
        <BrowserRouter basename={routerBasename}>
          <ThemeSync />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile-analysis" element={<MarkdownSectionPage sectionNumber={1} sectionId="profile" />} />
              <Route path="/leadership-principles" element={<LeadershipPrinciplesPage />} />
              <Route path="/star-stories" element={<StarStoriesPage />} />
              <Route path="/tools-systems" element={<MarkdownSectionPage sectionNumber={4} sectionId="tools" />} />
              <Route path="/network-planning" element={<MarkdownSectionPage sectionNumber={5} sectionId="planning" />} />
              <Route
                path="/network-optimization"
                element={<MarkdownSectionPage sectionNumber={6} sectionId="optimization" />}
              />
              <Route path="/business-strategy" element={<MarkdownSectionPage sectionNumber={7} sectionId="strategy" />} />
              <Route path="/japan-vs-india" element={<JapanVsIndiaPage />} />
              <Route path="/network-design-math" element={<NetworkDesignMathPage />} />
              <Route path="/experience-translation" element={<ExperienceTranslationPage />} />
              <Route
                path="/english-communication"
                element={<MarkdownSectionPage sectionNumber={11} sectionId="english" />}
              />
              <Route path="/interview-playbook" element={<InterviewPlaybookPage />} />
              <Route path="/practice-quiz" element={<PracticeQuizPage />} />
              <Route path="/final-checklist" element={<FinalChecklistPage />} />
              <Route path="/mock-interview" element={<MockInterviewPage />} />
              <Route path="/my-notes" element={<MyNotesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PrepGuideProvider>
    </ErrorBoundary>
  )
}
