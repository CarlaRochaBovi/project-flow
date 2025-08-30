import { useEffect, useState } from 'react'

interface AlertMessagePros {
  isDialogOpen: boolean
  dialogMessage: string
  setIsDialogOpen: (isOpen: boolean) => void
  duration?: number
}

export function AlertMessage({ dialogMessage, isDialogOpen, setIsDialogOpen, duration = 2000 }: AlertMessagePros) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    if (isDialogOpen) {
      setProgress(100)

      const intervalDuration = 50
      const decreament = 100 / (duration / intervalDuration)

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decreament
          return newProgress <= 0 ? 0 : newProgress
        })
      }, intervalDuration)

      timeout = setTimeout(() => {
        setIsDialogOpen(false)
        clearInterval(progressInterval)
      }, duration)
    }

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [isDialogOpen, duration, setIsDialogOpen])

  return (
    <dialog
      className={`p-5 z-100 absolute transition-all m-auto duration-300 min-w-sm max-w-lg break-all ${isDialogOpen ? 'opacity-100 top-5' : 'opacity-0 top-[-300px]'} flex flex-col items-center justify-center rounded bg-zinc-900`}
    >
      <h4 className="text-lg text-white mb-4">{dialogMessage}</h4>
      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 transition-all duration-50" style={{ width: `${progress}%` }}></div>
      </div>
    </dialog>
  )
}
