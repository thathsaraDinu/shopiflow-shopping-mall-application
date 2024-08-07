import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default Layout;
