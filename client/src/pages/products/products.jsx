import ProductsGrid from './productsGrid';

const Products = () => {
  return (
    <div>
      <div className="py-5 md:py-10 container mx-auto flex flex-col gap-10 min-h-screen">
        <h2 className="text-3xl font-bold bg-gradient-to-r text-center mb-6 from-blue-600 to-purple bg-clip-text text-transparent">
          Products
        </h2>
        <ProductsGrid />
      </div>
    </div>
  );
};

export default Products;
