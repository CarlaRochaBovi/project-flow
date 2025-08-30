import { type Dispatch, type SetStateAction } from 'react'
import { Check } from 'lucide-react'
import dayjs from 'dayjs'

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

interface ItemsTableProps {
  items: Item[]
  selectedItemsId: string[]
  setSelectedItemsId: Dispatch<SetStateAction<string[]>>
  sortBy: string
  sortRule: 'asc' | 'desc'
}

export function ItemsTable({ items, selectedItemsId, setSelectedItemsId, sortBy, sortRule }: ItemsTableProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  function toggleItemSelection(itemId: string) {
    setSelectedItemsId((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  function toggleSelectAll() {
    if (selectedItemsId.length === items?.length) {
      setSelectedItemsId([])
    } else {
      setSelectedItemsId(items ? items.map((item) => item.id) : [])
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category)
    } else if (sortBy === 'quantity') {
      comparison = a.quantity - b.quantity
    } else if (sortBy === 'price_un') {
      comparison = a.price - b.price
    } else if (sortBy === 'total_price') {
      const totalA = a.quantity * a.price
      const totalB = b.quantity * b.price
      comparison = totalA - totalB
    } else if (sortBy === 'latest' || sortBy === 'oldest') {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()

      comparison = dateA - dateB
      if (sortBy === 'oldest') {
        comparison = -comparison
      }
    }
    // Inverte a ordem se isDesc for true
    return sortRule == 'desc' ? -comparison : comparison
  })

  return (
    <table className="border-[2px] w-full min-w-4xl border-zinc-700">
      <thead>
        <tr>
          <th className="w-12 h-12 align-middle">
            <label className="flex items-center justify-center group cursor-pointer">
              <input
                checked={selectedItemsId.length === items.length && items.length > 0}
                onChange={toggleSelectAll}
                className="hidden"
                type="checkbox"
              />
              <span
                className="
                  w-5 h-5 flex items-center justify-center
                  rounded border border-zinc-800 bg-zinc-900
                  group-has-[:checked]:bg-amber-500 group-has-[:checked]:border-amber-500 
                "
                title="Selecionar todos"
              >
                <Check
                  strokeWidth={3}
                  className="w-4 h-4 transition-transform duration-200
                    group-has-[:checked]:scale-100 scale-0 text-zinc-100 font-bold
                  "
                />
              </span>
            </label>
          </th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Name</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Description</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Category</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Quantity</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Price</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Total Price</th>
          <th className="px-2 py-3 text-white text-lg h-12 align-middle">Created at</th>
        </tr>
      </thead>

      <tbody className="">
        {sortedItems.map((item) => (
          <tr key={item.id}>
            <td className="w-12 h-12 border border-zinc-800">
              <label className="flex items-center justify-center group cursor-pointer">
                <input
                  onChange={() => toggleItemSelection(item.id)}
                  checked={selectedItemsId.includes(item.id)}
                  type="checkbox"
                  className="hidden"
                />
                <span
                  className="
                    w-5 h-5 flex items-center justify-center
                    rounded border border-zinc-800 bg-zinc-900
                    group-has-[:checked]:bg-amber-500 group-has-[:checked]:border-amber-500 
                  "
                >
                  <Check
                    strokeWidth={3}
                    className="w-4 h-4 transition-transform duration-200
                      group-has-[:checked]:scale-100 scale-0 text-zinc-200 font-bold
                    "
                  />
                </span>
              </label>
            </td>
            <td className="border border-zinc-800 text-zinc-200 px-2 py-3 h-12 align-middle">{item.name}</td>
            <td className="border border-zinc-800 text-zinc-300 px-2 py-3 h-12 align-middle max-w-5 truncate">
              {item.description}
            </td>
            <td className="border border-zinc-800 text-zinc-300 px-2 py-3 h-12 align-middle capitalize">
              {item.category}
            </td>
            <td className="border border-zinc-800 text-zinc-300 px-2 py-3 h-12 align-middle">{item.quantity}</td>
            <td className="border border-zinc-800 text-zinc-300 px-2 py-3 h-12 align-middle">
              {formatCurrency(item.price)}
            </td>
            <td className="border border-zinc-800 text-zinc-300 px-2 py-3 h-12 align-middle">
              {formatCurrency(item.quantity * item.price)}
            </td>

            <td className="border border-zinc-800 text-zinc-400 px-2 py-3 h-12 align-middle">
              {dayjs(item.createdAt).format('DD/MM/YYYY')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
