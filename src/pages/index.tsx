import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'

type Product = {
  id: number
  price: number
  title: string
}

type Results = {
  totalPrice: number
  data: Product[]
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0
  })

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3004/products?q=${search}`)

    const data = await response.json()

    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product.price
    }, 0)

    setResults({
      totalPrice,
      data
    })
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishLList={addToWishList}
      />
    </div>
  )
}
