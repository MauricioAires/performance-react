import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
// import { AddProductToWishlist } from './AddProductToWishlist'

/**
 * @description para aplicaçãoes que não possui SRR pode utilizar o  React.lazy()
 * como o next possui SRR deve ser utiizar o dymanuc
 */
const AddProductToWishlist = dynamic(
  () =>
    import('./AddProductToWishlist').then((mod) => mod.AddProductToWishlist),
  {
    loading: () => <span>Carregando ...</span>
  }
)

interface ProductItemProps {
  product: {
    id: number
    price: number
    priceFormatted: string
    title: string
  }
  onAddToWishLList: (id: number) => void
}

export function ProductItemComponent({
  product,
  onAddToWishLList
}: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button type="button" onClick={() => setIsAddingToWishlist(true)}>
        Adiciona aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => {
            onAddToWishLList(product.id)
            setIsAddingToWishlist(false)
          }}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

/**
 * @description é possivel colocar o memo por volta do componente
 * mas da preferencia por separar em duas linhas porque o memo recepe algum
 * parâmetros
 *
 * o memo recebe um segundo parâmetro que é uma função onde você mesmo
 * pode fazer uma verificar para validar se as props do componente foram modificadas
 */

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    /**
     * @description { Object.is} realizar uma comparação profunda onde é verificado cada propriedade
     * do objeto
     */
    return Object.is(prevProps.product, nextProps.product)
  }
)
