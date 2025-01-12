import ProductsGrid from './productsGrid';

const Products = () => {
  return (
    <>
      <div className="py-5 md:py-10 container mx-auto flex flex-col gap-10 min-h-screen">
        <div className="text-3xl font-bold text-center text-black">
          Products
        </div>
        <ProductsGrid />
      </div>
    </>
  );
};

export default Products;
