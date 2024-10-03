import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShop } from '@/api/shop.api';
import toast from 'react-hot-toast';

const AddShop = () => {
  const navigate = useNavigate();

  const [newShop, setNewShop] = useState({
    name: '',
    location: null,
    openTime: {
      opening: '8:00 AM',
      closing: '9:00 PM',
    },
    contactNumber: '',
    ownerEmail: '',
    items: [],
    shopType: '',
  });
  const [contactError, setContactError] = useState(null);
  const [error, setError] = useState(null);

  // Validate contact number
  const validateContactNumber = (number) => {
    return /^0\d{9}$/.test(number);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handler to create a new shop
  const handleAddShop = async (e) => {
    e.preventDefault();

    if (!validateContactNumber(newShop.contactNumber)) {
      setContactError(
        'Contact number must start with 0 and be 10 digits long.',
      );
      toast.error('Please provide a valid contact number');
      return;
    }
    if (!validateEmail(newShop.ownerEmail)) {
      setContactError(
        'Please provide a valid email address',
      );
      toast.error('Invalid email address');
      return;
    }

    setContactError(null);

    try {
      const shopData = {
        ...newShop,
        openTime: `${newShop.openTime.opening} to ${newShop.openTime.closing}`,
        location: null,
      };
      await createShop(shopData);
      toast.success('Shop created successfully');
      navigate('/shopsadmin');
      setNewShop({
        name: '',
        location: null,
        openTime: {
          opening: '8:00 AM',
          closing: '9:00 PM',
        },
        contactNumber: '',
        ownerEmail: '',
        items: [],
        shopType: '',
      });
      setError(null);
    } catch (err) {
      setError('Error creating shop');
      toast.error('Error creating shop');
      console.error('Error creating shop:', err);
    }
  };

  // Handler for the add shop form input change
  const handleInputChange = (e) => {
    setNewShop({
      ...newShop,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    setNewShop({
      ...newShop,
      openTime: {
        ...newShop.openTime,
        [e.target.name]: e.target.value,
      },
    });
  };

  const times = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
  ];

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 mb-5">
      <h2
        className="text-center mb-6 text-3xl font-semibold text-gray-800"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        Add New Shop
      </h2>
      {error && (
        <p className="text-red-600 text-center mb-4">
          {error}
        </p>
      )}

      {/* Form container */}
      <form onSubmit={handleAddShop} className="space-y-6">
        {/* Shop Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Shop Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter shop name"
            value={newShop.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            required
          />
        </div>

        {/* Shop Type Dropdown */}
        <div>
          <label
            htmlFor="shopType"
            className="block text-sm font-medium text-gray-700"
          >
            Shop Type
          </label>
          <select
            name="shopType"
            id="shopType"
            value={newShop.shopType}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            required
          >
            <option value="" disabled>
              Select Shop Type
            </option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="jewelry">Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="grocery">Grocery</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="health">
              Health & Wellness
            </option>
            <option value="sports">Sports Equipment</option>
            <option value="books">Books & Magazines</option>
            <option value="toys">Toys & Games</option>
          </select>
        </div>

        {/* Open Time Select Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Open Time
          </label>
          <div className="flex space-x-4 mt-1">
            <select
              name="opening"
              value={newShop.openTime.opening}
              onChange={handleTimeChange}
              className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <select
              name="closing"
              value={newShop.openTime.closing}
              onChange={handleTimeChange}
              className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Number Input */}
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Shop Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter contact number"
            value={newShop.contactNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            required
          />
        </div>

        {/* Owner Email Input */}
        <div>
          <label
            htmlFor="ownerEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Owner Email Address
          </label>
          <input
            type="email"
            name="ownerEmail"
            id="ownerEmail"
            placeholder="Enter owner's email address"
            value={newShop.ownerEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter owner's password"
            value={newShop.ownerEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add Shop
        </Button>
      </form>
    </div>
  );
};

export default AddShop;
