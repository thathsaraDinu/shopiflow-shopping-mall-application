import ProductsGrid from './productsGrid';

const Products = () => {
  return (
    <>
      <div className="py-5 md:py-10">
        <div
          className="text-5xl font-bold text-center text-gradient bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          Products
        </div>
        <ProductsGrid />
      </div>
    </>
  );
};

export default Products;
