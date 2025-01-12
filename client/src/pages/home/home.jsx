import useProducts from '@/hooks/useProducts';
import ProductCard from '../products/productCard';
import HeroSection from '@/components/hero-section/hero-section';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';
import { LoadingSpinner } from '@/components/ui/spinner';

const Home = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-gray-100 py-5 md:py-10 px-5">
      <HeroSection />
      <div className="mb-10" />
      <div className="container mx-auto flex flex-col gap-10 mb-10">
        <h2 className="text-2xl font-bold">
          Discover Events & Offers
        </h2>
        <PromotionsScrollable></PromotionsScrollable>
      </div>
      <div className="container mx-auto flex flex-col gap-10 mb-10">
        <h2 className="text-2xl font-bold">
          Newest Products
        </h2>
        <div className="grid place-items-center xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2  gap-4">
          {isLoading ? (
            <div className="col-span-5 h-96 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            products &&
            products
              .slice(0, 5)
              .map((item) => (
                <ProductCard key={item.name} data={item} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
