// Popular.tsx
import React from 'react';
import "../Popular/Popular.css";
import Item from '../Item/Item';

const Popular = ({ data_product }: { data_product: any[] }) => {
  return (
    <div className='popular'>
      <h3>POPULAR</h3>
      <div className="popular-item">
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
  );
};

export default Popular;
