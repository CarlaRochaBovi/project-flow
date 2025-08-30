import { useEffect, useState } from 'react'
import { Header } from '../components/header'
import { ProjectCard } from '../components/project-card'
import { api } from '../lib/axios'
import { CreateProjectModal } from '../components/create-project-modal'
import { AlertMessage } from '../components/alert-message'

interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
}

export function HomePage() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  const [dialogMessage, setDialogMessage] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  async function getProjects() {
    try {
      const response = await api.get('/projects')
      const result = response.data.projects
      setProjects(result)
      return result
    } catch (error) {
      console.error('Error while fetching projects: ', error)
      return []
    }
  }

  async function createProject(name: string, description: string) {
    try {
      const response = await api.post('/projects', {
        name,
        description,
      })
      setProjects((prevProjects) => [...prevProjects, response.data])
      setIsCreateProjectModalOpen(false)
      setDialogMessage('Project created successfuly!')
      setIsDialogOpen(true)
      return response.data
    } catch (error) {
      setDialogMessage('Error while creating project')
      setIsDialogOpen(true)
      console.error('Error while creating project: ', error)
    }
  }

  async function deleteProject(projectId: string) {
    try {
      await api.delete(`/projects/${projectId}`)
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId))
      setDialogMessage('Project deleted successfuly!')
      setIsDialogOpen(true)
    } catch (error) {
      setDialogMessage('Error while deleting the project')
      setIsDialogOpen(true)
      console.error('Error while deleting project: ', error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="relative flex h-screen max-w-screen flex-col items-center">
      <AlertMessage
        isDialogOpen={isDialogOpen}
        dialogMessage={dialogMessage}
        setIsDialogOpen={setIsDialogOpen}
        duration={2000}
      />
      <Header setIsCreateProjectModalOpen={setIsCreateProjectModalOpen} />

      <CreateProjectModal
        createProject={createProject}
        isCreateProjectModalOpen={isCreateProjectModalOpen}
        setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
      />

      <div className="flex h-full max-h-screen w-full max-w-screen flex-col items-center justify-start gap-2 p-5">
        {projects.length === 0 || projects === null ? (
          <p className="font-light text-lg text-zinc-500">Out of projects</p>
        ) : (
          projects?.map((project: Project) => (
            <ProjectCard
              getProjects={getProjects}
              deleteProject={deleteProject}
              createdAt={project.createdAt}
              description={project.description}
              key={project.id}
              name={project.name}
              projectId={project.id}
            />
          ))
        )}
      </div>
    </div>
  )
}
