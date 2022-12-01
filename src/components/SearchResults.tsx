import { List, ListRowRenderer } from 'react-virtualized'
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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <ProductItem
        onAddToWishLList={onAddToWishLList}
        product={results[index]}
      />
    </div>
  )

  return (
    <div>
      <h2>Price total: {totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanColumnCount={5}
        rowCount={results.length}
        rowRenderer={(args) => rowRenderer(args)}
      />
    </div>
  )
}

/* {results.map((product) => (
        <ProductItem
          key={product.id}
          onAddToWishLList={onAddToWishLList}
          product={product}
        />
      ))} */
