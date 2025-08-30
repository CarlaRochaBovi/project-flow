import { ChevronDown } from 'lucide-react'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

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

interface FilterProps {
  setSortRule: Dispatch<SetStateAction<'asc' | 'desc'>>
  setSortBy: Dispatch<SetStateAction<SortBy>>
  sortBy: SortBy
  sortRule: 'asc' | 'desc'
}

export function Filters({ setSortRule, sortRule, sortBy, setSortBy }: FilterProps) {
  const [isSortRuleButtonActive, setSortRuleButtonActive] = useState<boolean>(true)
  useEffect(() => {
    if (sortBy === 'latest' || sortBy === 'oldest') {
      setSortRuleButtonActive(false)
    } else {
      setSortRuleButtonActive(true)
    }
  }, [sortBy])

  const toggleSortRule = () => {
    sortRule == 'desc' ? setSortRule('asc') : setSortRule('desc')
  }

  return (
    <div className="flex items-center flex-wrap justify-start gap-2">
      <label className="font-medium min-w-fit text-xl" htmlFor="order-by">
        Filters:
      </label>
      <div className="flex justify-center items-center w-fit">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="min-w-32 text-lg border-r-0 peer appearance-none rounded-s-sm text-zinc-200 cursor-pointer focus:outline-amber-500 -outline-offset-2 focus:outline-solid outline-2 outline-amber-500 outline-none bg-zinc-900 border-2 border-zinc-600 px-2 py-1"
            name="sort_by"
            id="sort_by"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="quantity">Quantity</option>
            <option value="price_un">Price Un.</option>
            <option value="total_price">Total Price</option>
          </select>
          <ChevronDown className="absolute transform peer-focus:text-amber-500 -translate-y-1/2 pointer-events-none size-5 top-1/2 right-3 text-zinc-200" />
        </div>

        <button
          disabled={!isSortRuleButtonActive}
          className={`cursor-pointer text-lg hover:border-2 hover:border-amber-500 hover:text-white disabled:bg-zinc-950 disabled:border-zinc-700 disabled:text-zinc-700 focus:outline-amber-500 -outline-offset-2 focus:outline-solid outline-2 outline-amber-500 outline-none bg-zinc-900 border-2 border-zinc-600 px-2 py-1 rounded-e-sm p-2 text-md text-zinc-200 hover:bg-amber-500`}
          onClick={() => toggleSortRule()}
        >
          {sortRule == 'desc' ? 'Desc' : 'Asc'}
        </button>
      </div>
    </div>
  )
}
