import { X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface ProjectDetailsModalProps {
  description?: String
  setIsDescriptionModalOpen: Dispatch<SetStateAction<boolean>>
}

export function ProjectDetailsModal({ description, setIsDescriptionModalOpen }: ProjectDetailsModalProps) {
  return (
    <div className="absolute h-screen w-screen flex items-center justify-center top-0 left-0 bg-black/50">
      <div className="bg-zinc-800 rounded max-w-2xl max-h-3xl relative p-8">
        <X
          onClick={() => setIsDescriptionModalOpen(false)}
          className="duration-300 scale-100 hover:scale-110 cursor-pointer transition-all text-zinc-200 rounded-full absolute top-1 left-1 p-1 hover:bg-zinc-700 size-8"
        />
        <p className="text-zinc-200 break-all text-lg">{!description ? 'No description' : description}</p>
      </div>
    </div>
  )
}
