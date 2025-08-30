/** biome-ignore-all lint/suspicious/noConsole: test */
import type { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

interface ProjectProps {
  name: string
  description: string
}

interface ProjectFormProps {
  createProject: (name: string, description: string) => void
  isCreateProjectModalOpen: boolean
  setIsCreateProjectModalOpen: Dispatch<SetStateAction<boolean>>
}

export function CreateProjectModal({
  createProject,
  isCreateProjectModalOpen,
  setIsCreateProjectModalOpen,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectProps>()

  async function onSubmit(data: ProjectProps) {
    try {
      const response = await createProject(data.name, data.description)
      reset()
      return response
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className={`${isCreateProjectModalOpen ? 'top-0 left-0 z-10 bg-black/50 opacity-100' : 'top-[-800px] opacity-1'} absolute z-0 h-full max-h-screen w-full max-w-screen transition-[height_colors] duration-200`}
    >
      <form className="flex flex-col gap-4 bg-zinc-900 p-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-2">
          <label className="font-medium text-lg" htmlFor="name">
            Project name
          </label>
          <input
            className={`w-full rounded-md border outline-0 bg-transparent px-3 py-2 text-md text-white ${
              errors.name ? 'border-red-400' : 'border-zinc-600'
            }`}
            placeholder="Robot building"
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: 'This field is required',
              },
              maxLength: {
                value: 100,
                message: 'The name must be no more than 100 characters long',
              },
            })}
          />
        </div>
        {errors.name && <span className="text-red-400">{errors.name.message}</span>}

        <div className="flex flex-col items-start gap-2">
          <label className="font-medium text-lg" htmlFor="description">
            Description (optional)
          </label>
          <textarea
            className={`field-sizing-fixed flex min-h-16 w-full rounded-md border ${errors.description ? 'border-red-400' : 'border-zinc-600'} bg-transparent px-3 py-2 text-white shadow-xs outline-none`}
            placeholder="Manual details"
            {...register('description', {
              maxLength: {
                value: 600,
                message: 'The description must be no more than 600 characters long',
              },
            })}
          />
          {errors.description && <span className="text-red-400">{errors.description.message}</span>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="max-w-fit cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-lg text-white hover:bg-amber-600"
            onClick={() => setIsCreateProjectModalOpen(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="max-w-fit cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-lg text-white hover:bg-amber-600"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
