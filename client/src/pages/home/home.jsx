import useProducts from '@/hooks/useProducts';
import ProductCard from '../products/productCard';
import HeroSection from '@/components/hero-section/hero-section';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';

const Home = () => {
  const { data } = useProducts();

  return (
    <div>
      <HeroSection />
      <div>
        <h2 className=" max-w-screen-xl container mx-auto font-bold text-3xl">
          Featured Products
        </h2>
        <div className="max-w-screen-xl mx-auto grid place-items-center  xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2  gap-4 mt-10 mb-[100px]">
          {data &&
            data
              .slice(0, 5)
              .map((item) => (
                <ProductCard key={item.name} data={item} />
              ))}
        </div>
      </div>
      <div className=" my-10 flex flex-col gap-16 items-center">
        <div className="flex flex-col mx-10 gap-10">
          <h2 className="  self-start font-bold text-3xl">
            Discover Events & Offers
          </h2>
          <PromotionsScrollable></PromotionsScrollable>
        </div>
      </div>
    </div>
  );
};
export default Home;
