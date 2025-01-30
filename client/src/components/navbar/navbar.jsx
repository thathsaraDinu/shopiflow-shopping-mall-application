import { Link } from 'react-router-dom';
import {
  MdMenu,
  MdFavorite,
} from 'react-icons/md';
import {} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';
import Logo from '@/assets/logo/logo.png';
import AvatarIcon from '@/components/navbar/avatar';
import { useAuthStore } from '@/store/auth-store';
import { useWishlitStore } from '@/store/wishlist-store';
import { cn } from '@/lib/utils';

// Menu Items for all users (public)
const MenuItemsAll = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Shops',
    url: '/shops',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Offers',
    url: '/promotions',
  },
];

// Menu Items for authenticated users (role: user)
const MenuItemsUser = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Shops',
    url: '/shops',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Queues',
    url: '/myqueue',
  },
  {
    title: 'Offers',
    url: '/promotions',
  },
];

// Menu Items for authenticated users (role: admin)
const MenuItemsAdmin = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
];

// Menu Items for authenticated users (role: shop owner)
const MenuItemsShopOwner = [
  {
    title: 'Queue',
    url: '/queue',
  },
];

export default function Navbar() {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);
  const wishlistCount = useWishlitStore(
    (state) => state.count,
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/20 bg-gradient-to-r from-blue-600 to-purple backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 rounded-md"
          />

          <span className="text-xl font-bold text-white">
            ShopiFlow
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            !isAuthenticated && MenuItemsAll,
            isAuthenticated &&
              role === 'user' &&
              MenuItemsUser,
            isAuthenticated &&
              role === 'admin' &&
              MenuItemsAdmin,
            isAuthenticated &&
              role === 'shopOwner' &&
              MenuItemsShopOwner,
          ]
            .filter(Boolean)
            .flat()
            .map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className={cn(
                  'relative text-sm font-medium text-white/90 transition-colors hover:text-white',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full',
                )}
              >
                {item.title}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <Link to="/wishlist" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10"
              >
                <MdFavorite className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-400 text-xs font-medium text-white animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          <AvatarIcon />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10 md:hidden"
              >
                <MdMenu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-gradient-to-b from-blue-600 to-purple sm:w-[400px]"
            >
              <nav className="grid gap-4 py-4">
                {[
                  !isAuthenticated && MenuItemsAll,
                  isAuthenticated &&
                    role === 'user' &&
                    MenuItemsUser,
                  isAuthenticated &&
                    role === 'admin' &&
                    MenuItemsAdmin,
                  isAuthenticated &&
                    role === 'shopOwner' &&
                    MenuItemsShopOwner,
                ]
                  .filter(Boolean)
                  .flat()
                  .map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
