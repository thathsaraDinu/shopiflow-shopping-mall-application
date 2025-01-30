import useProducts from '@/hooks/useProducts';
import ProductCard from '../products/productCard';
import HeroSection from '@/components/hero-section/hero-section';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
  FiSmartphone,
  FiPackage,
  FiHome,
  FiStar,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth-store';

const Home = () => {
  const { products, isLoading } = useProducts();

  const categories = [
    { name: 'Electronics', icon: FiSmartphone },
    { name: 'Fashion', icon: FiPackage },
    { name: 'Home', icon: FiHome },
    { name: 'Featured', icon: FiStar },
  ];
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Promotions Section */}
      <section className="container mx-auto px-5 my-16">
        <div className="flex items-center justify-between gap-3 mb-8">
          <h2 className="text-3xl text-left font-bold bg-gradient-to-r from-blue-600 to-purple bg-clip-text text-transparent">
            Discover Events & Offers
          </h2>
          <Link
            to={'/shops'}
            className="text-blue-600 text-right hover:text-blue-700 font-medium transition-colors duration-300"
          >
            View All
          </Link>
        </div>
        <PromotionsScrollable />
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-5 mb-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r text-center mb-8 from-blue-600 to-purple bg-clip-text text-transparent">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer animate-slide-in "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-xl shadow-sm p-8 transition-all duration-300 border border-1 group-hover:shadow-xl group-hover:-translate-y-2">
                <category.icon
                  size={32}
                  className="mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-lg font-medium text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newest Products Section */}
      <section className="container flex flex-col gap-8 px-5 mb-16 text-center">
        <div className="flex items-center justify-between gap-3 ">
          <h2 className="text-left text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple bg-clip-text text-transparent">
            Newest Products
          </h2>
          <Link
            to={'/products'}
            className="text-blue-600 text-right hover:text-blue-700 font-medium transition-colors duration-300"
          >
            See All Products
          </Link>
        </div>
        <div className="grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 mx-auto gap-4">
          {isLoading ? (
            <div className="col-span-5 h-96 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            products &&
            products
              .slice(0, 5)
              .map((item, index) => (
                <ProductCard
                  key={index}
                  data={item}
                  isLoggedIn={isLoggedIn}
                />
              ))
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-5 relative">
          <div className="max-w-2xl mx-auto text-center ">
            <h2 className="text-4xl font-bold mb-4 text-white animate-float">
              Stay Updated
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Subscribe to our newsletter for exclusive
              offers and updates
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the page from reloading
                setTimeout(() => {
                  toast.success('Successful');
                }, 400); // Show toast message after 1 second
              }}
              className="flex flex-wrap items-center justify-center gap-3 animate-slide-in"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-transparent focus:border-white bg-white/10 backdrop-blur-md text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      <hr className="bg-white w-full" />
    </div>
  );
};

export default Home;
