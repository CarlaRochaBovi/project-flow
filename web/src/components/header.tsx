import { Plus } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  setIsCreateProjectModalOpen: Dispatch<SetStateAction<boolean>>
}

export function Header({ setIsCreateProjectModalOpen }: HeaderProps) {
  return (
    <header className="w-full border-zinc-800 border-b bg-zinc-950 px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="font-bold text-2xl text-white">Project Flow</h1>

        <button
          onClick={() => {
            setIsCreateProjectModalOpen(true)
          }}
          className="flex items-center cursor-pointer justify-center gap-2 rounded bg-amber-500 px-2 py-1 text-center  text-white hover:bg-amber-600"
        >
          <Plus />

          <span className="hidden sm:block font-medium text-lg mr-2">Create project</span>
        </button>
      </div>
    </header>
  )
}
