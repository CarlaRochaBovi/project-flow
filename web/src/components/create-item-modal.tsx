/** biome-ignore-all lint/suspicious/noConsole: test */
import { ChevronDown } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

interface ItemPropsForm {
  name: string
  description: string
  category: string
  quantity: string
  price: string
}

interface CreateItemModalProps {
  createItem: (name: string, description: string, category: string, quantity: string, price: string) => void
  setIsCreateItemModalOpen: Dispatch<SetStateAction<boolean>>
}

export function CreateItemModal({ createItem, setIsCreateItemModalOpen }: CreateItemModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemPropsForm>()

  async function onSubmit(data: ItemPropsForm) {
    const response = await createItem(data.name, data.description, data.category, data.quantity, data.price)
    reset()
    return response
  }

  return (
    <div className="fixed z-20 w-full p-4 h-full flex items-center justify-center top-0 left-0 bg-black/50">
      <form
        className="flex flex-col gap-4  max-w-4xl max-h-4xl rounded bg-zinc-900 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-start gap-2">
          <label className="font-medium text-lg" htmlFor="name">
            Name
          </label>
          <input
            autoFocus
            className={`w-full ${errors.name ? 'border-red-400' : 'border-zinc-600'} rounded-md border outline-0 bg-transparent px-3 py-2 text-md text-white`}
            placeholder="Plank"
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: 'This field is required',
              },
              maxLength: {
                value: 50,
                message: 'The name must be no more than 50 characters long',
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
            className="field-sizing-fixed flex min-h-16 w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 text-white shadow-xs outline-none"
            placeholder="OBS: buy as soon as possible!"
            {...register('description', {
              maxLength: {
                value: 200,
                message: 'The description must be no more than 200 characters long',
              },
            })}
          />
        </div>

        <div className="flex flex-wrap justify-start gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-medium text-lg" htmlFor="category">
              Category:
            </label>
            <div className="relative">
              <select
                defaultValue={''}
                {...register('category')}
                className="w-43  peer appearance-none rounded-sm text-zinc-200 cursor-pointer focus:outline-amber-500 -outline-offset-2 focus:outline-solid outline-2 outline-amber-500 outline-none bg-zinc-900 border-2 border-zinc-600 px-2 py-1"
                name="category"
                id="category"
              >
                <option value="">Select a category</option>
                <option value="material">Material</option>
                <option value="tool">Tool</option>
                <option value="repair">Repair</option>
                <option value="others">Others</option>
              </select>
              <ChevronDown className="absolute transform peer-focus:text-amber-500 -translate-y-1/2 pointer-events-none size-5 top-1/2 right-3 text-zinc-400" />
            </div>
          </div>

          <div className="flex flex-wrap items-center grow gap-2">
            <label className="font-medium text-lg" htmlFor="quantity">
              Quantity:
            </label>
            <input
              type="number"
              {...register('quantity')}
              min="0"
              max="10000"
              className="[appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [-moz-appearance:textfield] max-w-18 text-center appearence-none bg-zinc-900 focus:outline-amber-500 focus:outline-solid -outline-offset-2 outline-2 outline-none rounded-sm border-2 border-zinc-600 placeholder:text-zinc-400 text-zinc-200 px-2 py-1"
              placeholder="0"
            />
          </div>

          <div className="flex flex-wrap items-center grow-0 gap-2">
            <label className="font-medium text-lg" htmlFor="price">
              Price Un.:{' '}
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              min="0"
              max="1000000"
              className="[appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            [-moz-appearance:textfield] max-w-22 text-center appearence-none bg-zinc-900 focus:outline-amber-500 focus:outline-solid -outline-offset-2 outline-2 outline-none rounded-sm border-2 border-zinc-600 placeholder:text-zinc-400 text-zinc-200 px-2 py-1"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="max-w-fit cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-lg text-white hover:bg-amber-600"
            onClick={() => setIsCreateItemModalOpen(false)}
            type="button"
          >
            Close
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
