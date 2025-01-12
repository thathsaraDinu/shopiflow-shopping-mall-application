import { Link } from 'react-router-dom';
import { MdMenu, MdFavorite } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';
import Logo from '@/assets/logo/logo.png';
import AvatarIcon from '@/components/navbar/avatar';
import { useAuthStore } from '@/store/auth-store';
import { useWishlitStore } from '@/store/wishlist-store';

// Menu Items for all users (public)
const MenuItemsAll = [
  {
    title: 'Home',
    url: '/',
  },
  // {
  //   title: 'About',
  //   url: '/about',
  // },
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
  // {
  //   title: 'About',
  //   url: '/about',
  // },
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
  // {
  //   title: 'Wishlist',
  //   url: '/wishlist',
  // },
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
  // Check if user is authenticated
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);
  const wishlistCount = useWishlitStore(
    (state) => state.count,
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 rounded-md"
          />
          <span className="sr-only">ShopiFlow</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {/* Menu Items map */}
          {!isAuthenticated &&
            MenuItemsAll.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                {item.title}
              </Link>
            ))}

          {isAuthenticated &&
            role === 'user' &&
            MenuItemsUser.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                {item.title}
              </Link>
            ))}

          {isAuthenticated &&
            role === 'admin' &&
            MenuItemsAdmin.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                {item.title}
              </Link>
            ))}

          {isAuthenticated &&
            role === 'shopOwner' &&
            MenuItemsShopOwner.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                {item.title}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <FiSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wishlist Icon */}
          {isAuthenticated && (
            <Link to="/wishlist" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <MdFavorite className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Wishlist</span>
              </Button>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-xs text-white">
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
                className="rounded-full md:hidden"
              >
                <MdMenu className="h-5 w-5 text-gray-800 dark:text-gray-400" />
                <span className="sr-only">
                  Toggle navigation menu
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {/* Menu Items map */}
                {MenuItemsAll.map((item, index) => (
                  <Link
                    key={index}
                    to={item.url}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    {item.title}
                  </Link>
                ))}
                {isAuthenticated &&
                  MenuItemsAll.map((item, index) => (
                    <Link
                      key={index}
                      to={item.url}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
