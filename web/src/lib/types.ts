export interface Item {
  id: string
  projectId: string
  name: string
  description: string
  category: string
  quantity: number
  price: number
  createdAt: string
}

export interface ExportOptions {
  format: 'excel' | 'csv'
  fileName?: string
  includeHeaders?: boolean
}

export interface ItemsTableProps {
  items: Item[]
  onExport?: (format: 'excel' | 'csv') => void
}
