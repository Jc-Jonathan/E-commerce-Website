import Item from '../Components/Item/Item'
import "../Relatedproduct/RelatedProduct.css"
const RelatedProduct = ({ data_product }: { data_product: any[] }) => {
  return (
    <div className='relatedproductcontainer'>
        <h2>RELATED PRODUCT</h2>
      <div className="relatedproduct">
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