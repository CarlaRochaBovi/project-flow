import { Plus, Save, Trash } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { exportItemsToFile } from '../lib/save-document'
import { Filters } from './filters'

interface Item {
  id: string
  projectId: string
  name: string
  description: string
  category: string
  quantity: number
  price: number
  createdAt: string
}

interface SortByOptions {
  latest: 'latest'
  oldest: 'oldest'
  name: 'name'
  cateogry: 'category'
  quantity: 'quantity'
  price_un: 'price_un'
  total_price: 'total_price'
}

type SortBy = keyof SortByOptions

interface ItemsTableManagerProps {
  setSortRule: Dispatch<SetStateAction<'asc' | 'desc'>>
  setSortBy: Dispatch<SetStateAction<SortBy>>
  sortBy: SortBy
  sortRule: 'asc' | 'desc'
  setIsCreateItemModalOpen: Dispatch<SetStateAction<boolean>>
  buttonDisabled: boolean
  setSelectedItemsId: Dispatch<SetStateAction<string[]>>
  selectedItemsId: string[]
  getItems: () => void
  deleteSelectedItems: (data: string[]) => void
  items: Item[]
  setDialogMessage: Dispatch<SetStateAction<string>>
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export function ItemsTableManager({
  items,
  setSortRule,
  sortRule,
  sortBy,
  setSortBy,
  setIsCreateItemModalOpen,
  buttonDisabled,
  selectedItemsId,
  deleteSelectedItems,
  setDialogMessage,
  setIsDialogOpen,
}: ItemsTableManagerProps) {
  const handleExport = (format: 'excel' | 'csv') => {
    try {
      exportItemsToFile(items, {
        format,
        fileName: `project-items`,
        includeHeaders: true,
      })
      setDialogMessage(`File ${format.toUpperCase()} exported successfuly!`)
      setIsDialogOpen(true)
    } catch (error) {
      setDialogMessage('Error while exporting the file')
      setIsDialogOpen(true)
      console.error(error)
    }
  }
  const [showExportOption, setShowExportOption] = useState<boolean>(false)

  return (
    <div className="flex flex-wrap gap-4 sm:flex-nowrap justify-between items-center">
      <button
        className="cursor-pointer w-full sm:w-40 min-w-fit items-center justify-center h-fit flex gap-2 text-lg rounded bg-amber-500 hover:bg-amber-600 px-2 py-1"
        onClick={() => {
          setIsCreateItemModalOpen(true)
        }}
      >
        <Plus /> Item
      </button>

      <div className="flex flex-wrap gap-4 justify-between items-center w-full">
        <Filters setSortBy={setSortBy} sortBy={sortBy} setSortRule={setSortRule} sortRule={sortRule} />
        <div className="relative bg-zinc-950 gap-2 flex items-center justify-center">
          <button
            className="text-zinc-400 hover:text-white disabled:text-zinc-700 p-2 rounded disabled:bg-zinc-800 disabled:border-zinc-700 not-disabled:hover:bg-zinc-900 bg-zinc-950 border border-zinc-800  transition-all duration-150 cursor-pointer disabled:cursor-default"
            disabled={buttonDisabled}
            onClick={() => deleteSelectedItems(selectedItemsId)}
          >
            <Trash />
          </button>

          <button
            onClick={() => setShowExportOption(!showExportOption)}
            className="text-zinc-400 hover:text-white disabled:text-zinc-700 p-2 rounded disabled:bg-zinc-800 disabled:border-zinc-700 not-disabled:hover:bg-zinc-900 bg-zinc-950 border border-zinc-800  transition-all duration-150 cursor-pointer disabled:cursor-default"
          >
            <Save />
          </button>

          {showExportOption && (
            <div
              onMouseLeave={() => setShowExportOption(false)}
              className="bg-zinc-900 absolute top-10 right-8 z-10 flex flex-col justify-center min-w-max rounded"
            >
              <button
                onClick={() => handleExport('excel')}
                className="cursor-pointer text-center px-4 py-2 w-full text-lg text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-all duration-500"
              >
                Excel file
              </button>

              <button
                onClick={() => handleExport('csv')}
                className="cursor-pointer text-center px-4 py-2 w-full text-lg text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-all duration-500"
              >
                CSV file
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
