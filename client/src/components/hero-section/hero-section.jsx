import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative md:h-[600px] min-h-[calc(100vh-137px)] flex justify-center items-center py-20 bg-gradient-to-r from-blue-600 to-purple overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </div>
      <div className="relative container mx-auto px-5 h-full flex items-center">
        <div className="max-w-2xl animate-slide-in">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white mb-6 animate-float">
            🎉 New Season Collection
          </span>
          <h1 className="text-6xl font-bold mb-6 text-white">
            Discover Amazing
            <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h1>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            Shop the latest trends and innovations with our
            curated collection of premium products.
            Experience quality like never before.
          </p>
          <div className='w-44'>
            <Link
              to={'/shops'}
              className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Shop Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
