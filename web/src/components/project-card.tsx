import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ProjectCardsProps {
  projectId: string
  name: string
  description: string
  createdAt: Date
  deleteProject: (projectId: string) => Promise<void>
  getProjects: () => void
}

export function ProjectCard({
  projectId,
  name,
  description,
  createdAt,
  deleteProject,
  getProjects,
}: ProjectCardsProps) {
  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="w-full flex justify-between gap-4 items-center">
      <div className="max-w-5/10 overflow-hidden">
        <h3 className="text-xl font-bold max-w-[150px] sm:max-w-[400px] truncate">{name}</h3>
        <p className="text-zinc-400 truncate ">{description}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-4">
          <button
            onClick={() => {
              deleteProject(projectId)
            }}
            className="text-zinc-400 hover:text-white duration-250 cursor-pointer underline text-sm"
          >
            Delete
          </button>

          <Link to={`/projects/${projectId}`}>
            <button className="bg-amber-500 hover:bg-amber-600 rounded px-2 py-1 cursor-pointer">Open</button>
          </Link>
        </div>

        <p className=" text-zinc-500 text-sm">{dayjs(createdAt.toString()).format('DD/MM/YYYY')}</p>
      </div>
    </div>
  )
}
