import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/axios'
import { CreateItemModal } from '../components/create-item-modal'
import { ProjectDetailsModal } from '../components/project-details-modal'
import { ProjectPageHeader } from '../components/project-page-header'
import { ItemsTable } from '../components/items-table'
import { ItemsTableManager } from '../components/items-table-manager'
import { AlertMessage } from '../components/alert-message'

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
}

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

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<Project | null>(null)
  // const [isLoading, setIsLoading] = useState(true)

  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false)

  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [sortRule, setSortRule] = useState<'asc' | 'desc'>('desc')
  const [sortBy, setSortBy] = useState<SortBy>('latest')

  const [dialogMessage, setDialogMessage] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (projectId) {
      getProject()
      getItems()
    }
  }, [projectId])

  useEffect(() => {
    setButtonDisabled(selectedItemsId.length === 0)
  }, [selectedItemsId])

  async function getItems() {
    try {
      const response = await api.get(`/projects/${projectId}/items`)
      setItems(response.data.items)
    } catch (error) {
      setDialogMessage('Error while searching for items. Please try again later.')
      setIsDialogOpen(true)
      console.error('Error fetching items:', error)
    }
  }

  async function deleteSelectedItems(itemsId: string[]) {
    try {
      await api.delete(`/projects/${projectId}/items`, {
        data: { itemsId },
      })
      setSelectedItemsId([])
      await getItems() // Recarrega os items do servidor
      setDialogMessage('Item(s) deleted successfully!')
      setIsDialogOpen(true)
    } catch (error) {
      setDialogMessage('Error while deleting item(s)')
      setIsDialogOpen(true)
      console.error('Error deleting items:', error)
    }
  }

  async function getProject() {
    try {
      console.log('123123123')
      const response = await api.get(`/projects/${projectId}`)
      setProject(response.data)
      return response.data
    } catch (error) {
      setDialogMessage('Error while searching for the selected project. Please try again later.')
      setIsDialogOpen(true)
      console.error('Error fetching project:', error)
    }
  }

  async function createItem(name: string, description: string, category: string, quantity: string, price: string) {
    try {
      await api.post(`/projects/${projectId}/items`, {
        name,
        description,
        category,
        quantity: Number(quantity),
        price: Number(price),
      })

      await getItems()

      setDialogMessage('Item created successfully!')
      setIsDialogOpen(true)
    } catch (error) {
      setDialogMessage('Error while creating item. Please try again later.')
      setIsDialogOpen(true)
      console.error('Error creating item:', error)
    }
  }
  return (
    <div className="h-full min-h-screen overflow-y-auto relative">
      <div className="p-4 flex flex-col gap-12.5">
        <AlertMessage
          isDialogOpen={isDialogOpen}
          dialogMessage={dialogMessage}
          setIsDialogOpen={setIsDialogOpen}
          duration={2000}
        />

        {isDescriptionModalOpen && (
          <ProjectDetailsModal
            description={project?.description}
            setIsDescriptionModalOpen={setIsDescriptionModalOpen}
          />
        )}

        <ProjectPageHeader
          description={project?.description}
          setIsDescriptionModalOpen={setIsDescriptionModalOpen}
          isDescriptionModalOpen={isDescriptionModalOpen}
          name={project?.name}
        />

        <ItemsTableManager
          setDialogMessage={setDialogMessage}
          setIsDialogOpen={setIsDialogOpen}
          items={items}
          getItems={getItems}
          deleteSelectedItems={deleteSelectedItems}
          selectedItemsId={selectedItemsId}
          setSelectedItemsId={setSelectedItemsId}
          buttonDisabled={buttonDisabled}
          setIsCreateItemModalOpen={setIsCreateItemModalOpen}
          sortRule={sortRule}
          setSortRule={setSortRule}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {isCreateItemModalOpen && (
        <CreateItemModal setIsCreateItemModalOpen={setIsCreateItemModalOpen} createItem={createItem} />
      )}

      <div className="flex overflow-auto px-4 pb-4">
        <ItemsTable
          setSelectedItemsId={setSelectedItemsId}
          sortBy={sortBy}
          sortRule={sortRule}
          selectedItemsId={selectedItemsId}
          items={items}
        />
      </div>
    </div>
  )
} // ✅ Fechamento correto da função ProjectPage
