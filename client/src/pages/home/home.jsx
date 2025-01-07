import useProducts from '@/hooks/useProducts';
import ProductCard from '../products/productCard';
import HeroSection from '@/components/hero-section/hero-section';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';
import { LoadingSpinner } from '@/components/ui/spinner';

const Home = () => {
  const { data, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-gray-100 py-5 md:py-10 px-5">
      <HeroSection />
      <div className="mb-10"/>
      <div className="container mx-auto flex flex-col gap-10 mb-10">
        <h2
          className=" text-3xl font-semibold text-gradient bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          Featured Products
        </h2>
        <div className="grid place-items-center xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2  gap-4">
          {isLoading ? (
            <div className="col-span-5 h-96 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            data &&
            data
              .slice(0, 5)
              .map((item) => (
                <ProductCard key={item.name} data={item} />
              ))
          )}
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-10 mb-10">
        
          <h2
            className=" text-3xl font-semibold text-gradient bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Discover Events & Offers
          </h2>
          <PromotionsScrollable></PromotionsScrollable>
       
      </div>
    </div>
  );
};
export default Home;
