import { ArrowLeftFromLineIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface ProjectPageHeaderProps {
  setIsDescriptionModalOpen: Dispatch<SetStateAction<boolean>>
  isDescriptionModalOpen: boolean
  name?: String
  description?: String
}

export function ProjectPageHeader({
  setIsDescriptionModalOpen,
  isDescriptionModalOpen,
  description,
  name,
}: ProjectPageHeaderProps) {
  return (
    <header className="flex h-fit flex-col gap-5">
      <div className="flex w-full sm:justify-center sm:flex-wrap relative justify-end items-center">
        <a
          href="/"
          className="absolute left-0 top-0 hover:-left-0.5 cursor-pointer flex items-center justify-center gap-2 text-xl text-zinc-300 hover:text-white duration-300 transition-all hover:scale-105"
        >
          <ArrowLeftFromLineIcon />
          Back
        </a>
        <h3 className="font-semibold break-all flex-wrap max-w-[60%] text-end text-2xl">{name}</h3>
      </div>

      <div className="max-w-full items-start w-full sm:max-w-[80%] flex flex-col ">
        <p className={`text-xl text-zinc-200 max-w-[60%] min-w-[75%] truncate`}>{description}</p>
        <button
          onClick={() => {
            setIsDescriptionModalOpen(!isDescriptionModalOpen)
          }}
          className="text-sm min-w-fit text-start text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
        >
          View description details
        </button>
      </div>
    </header>
  )
}
