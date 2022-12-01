import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
  }
  onAddToWishLList: (id: number) => void
}

export function ProductItemComponent({
  product,
  onAddToWishLList
}: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishLList(product.id)} type="button">
        Add to wishlist
      </button>
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
