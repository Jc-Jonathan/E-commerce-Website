import React from 'react'
import Item from '../Components/Item/Item'
const RelatedProduct = ({ data_product }: { data_product: any[] }) => {
  return (
    <div className='newcollectioncontainer'>
        <h3>RELATED PRODUCT</h3>
      <div className="newcollection-item">
        {data_product.map((item: any, i: number) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.newPrice}
            old_price={item.oldPrice}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct