import useProducts from '@/hooks/useProducts';
import ProductCard from '../products/productCard';
import HeroSection from '@/components/hero-section/hero-section';

const Home = () => {
  const { data } = useProducts();

  return (
    <div>
      <HeroSection />
      <div>
        <h2 className="max-w-screen-xl mx-auto font-bold text-3xl">
          Featured Porudcts
        </h2>
        <div className="max-w-screen-xl mx-auto grid place-items-center grid-cols-3 gap-4 mt-10 mb-[100px]">
          {data &&
            data
              .slice(0, 3)
              .map((item) => (
                <ProductCard key={item.name} data={item} />
              ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
