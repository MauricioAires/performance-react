import { ProductItem } from './ProductItem'

export type Product = {
  id: number
  price: number
  title: string
  priceFormatted: string
}

interface SearchResultsProps {
  results: Product[]
  totalPrice: number
  onAddToWishLList: (id: number) => void
}

export function SearchResults({
  results,
  totalPrice,
  onAddToWishLList
}: SearchResultsProps) {
  return (
    <div>
      <h2>Price total: {totalPrice}</h2>
      {results.map((product) => (
        <ProductItem
          key={product.id}
          onAddToWishLList={onAddToWishLList}
          product={product}
        />
      ))}
    </div>
  )
}
