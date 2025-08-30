import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { ProjectPage } from './pages/project-page'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} index />
          <Route element={<ProjectPage />} path="/projects/:projectId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
