import React from 'react';
import ProductCard from './productCard';
import useProducts from '@/hooks/useProducts';

const ProductsGrid = () => {
  const { data } = useProducts();

  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto">
        {data &&
          data.map((item) => (
            <ProductCard key={item.name} data={item} />
          ))}
      </div>
    </>
  );
};

export default ProductsGrid;
