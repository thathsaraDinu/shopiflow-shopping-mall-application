import { getShopById } from '@/api/shop.api';
import { useAuthStore } from '@/store/auth-store';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
  FiShoppingBag,
  FiMapPin,
  FiClock,
  FiPhone,
  FiMail,
  FiTag,
  FiUser,
  FiTrendingUp,
  FiPackage,
  FiDollarSign,
} from 'react-icons/fi';

import PropTypes from 'prop-types';

function StatCard({
  icon: Icon,
  title,
  value,
  className = '',
}) {
  return (
    <Card
      className={`hover:shadow-lg transition-shadow ${className}`}
    >
      <CardContent className="flex items-center p-6">
        <div className="rounded-full p-3 bg-gray-100">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const shopId = useShopStore((state) => state.shopId);
  const fullName = useAuthStore((state) => state.fullName);

  const {
    data: shopData,
    isLoading: shopLoading,
    isError: shopIsError,
  } = useQuery({
    queryKey: ['shopData', shopId],
    queryFn: () => getShopById(shopId),
    enabled: !!shopId,
  });

  // Mock data for demonstration
  const mockStats = {
    totalSales: '$12,345',
    totalOrders: '156',
    avgOrderValue: '$79.13',
    inventory: '234',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {fullName}
            </h1>
            <p className="text-gray-500">
              Here&apos;s what&apos;s happening with your shop today.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Download Report
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
              View Analytics
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FiDollarSign}
            title="Total Sales"
            value={mockStats.totalSales}
          />
          <StatCard
            icon={FiTrendingUp}
            title="Total Orders"
            value={mockStats.totalOrders}
          />
          <StatCard
            icon={FiPackage}
            title="Avg. Order Value"
            value={mockStats.avgOrderValue}
          />
          <StatCard
            icon={FiShoppingBag}
            title="Inventory Items"
            value={mockStats.inventory}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shop Details */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center text-lg">
                <FiShoppingBag className="mr-2" /> Shop
                Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {shopLoading ? (
                <LoadingSpinner className="h-10 w-full" />
              ) : shopIsError ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-md">
                  <p className="font-medium">
                    Error loading shop data
                  </p>
                  <p className="text-sm">
                    {shopIsError.message}
                  </p>
                </div>
              ) : shopData ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiShoppingBag className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Shop Name
                      </p>
                      <p className="font-medium">
                        {shopData.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Location
                      </p>
                      <p className="font-medium">
                        {shopData.location ||
                          'Not Provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Operating Hours
                      </p>
                      <p className="font-medium">
                        {shopData.openTime ||
                          'Not Provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Contact Number
                      </p>
                      <p className="font-medium">
                        {shopData.contactNumber ||
                          'Not Provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Email Address
                      </p>
                      <p className="font-medium">
                        {shopData.ownerEmail ||
                          'Not Provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FiTag className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Shop Type
                      </p>
                      <p className="font-medium">
                        {shopData.shopType ||
                          'Not Provided'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 text-yellow-600 p-4 rounded-md">
                  <p className="font-medium">
                    No shop data available
                  </p>
                  <p className="text-sm">
                    Please complete your shop profile.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Owner Details & Quick Actions */}
          <div className="space-y-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <FiUser className="mr-2" /> Owner Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {fullName}
                    </h3>
                    <p className="text-gray-500">
                      Shop Owner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-lg">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                    <h4 className="font-medium">
                      Update Profile
                    </h4>
                    <p className="text-sm text-gray-500">
                      Edit your shop details
                    </p>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                    <h4 className="font-medium">
                      View Orders
                    </h4>
                    <p className="text-sm text-gray-500">
                      Check recent orders
                    </p>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                    <h4 className="font-medium">
                      Inventory
                    </h4>
                    <p className="text-sm text-gray-500">
                      Manage your products
                    </p>
                  </button>
                  <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                    <h4 className="font-medium">
                      Settings
                    </h4>
                    <p className="text-sm text-gray-500">
                      Configure your shop
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Dashboard;
