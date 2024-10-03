import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for route parameters
import { updateShop, getShopById } from '@/api/shop.api';
import toast from 'react-hot-toast';

const UpdateShop = () => {
    const navigate = useNavigate();
    const { shopId } = useParams(); // Get shopId from the URL
    const [editingShop, setEditingShop] = useState({
        name: '',
        location: null,
        openTime: {
            opening: '8:00 AM',
            closing: '9:00 PM'
        },
        contactNumber: '',
        ownerEmail: '', // Owner's email field
        shopType: '', // Shop type field
    });
    const [contactError, setContactError] = useState(null);
    const [error, setError] = useState(null);

    // Fetch shop data when component loads
    useEffect(() => {
        const fetchShop = async () => {
            try {
                console.log("Fetching shop with ID:", shopId);
                const shopData = await getShopById(shopId);
                setEditingShop({
                    ...shopData,
                    openTime: {
                        opening: shopData.openTime.split(' to ')[0],
                        closing: shopData.openTime.split(' to ')[1],
                    }
                });
            } catch (err) {
                console.error(err);
                setError('Error fetching shop data');
            }
        };
        fetchShop();
    }, [shopId]);

    // Validate contact number
    const validateContactNumber = (number) => {
        return /^0\d{9}$/.test(number);
    };

    // Handler to update the shop
    const handleUpdateShop = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateContactNumber(editingShop.contactNumber)) {
            setContactError('Contact number must start with 0 and be 10 digits long.');
            toast.error('Please provide a valid contact number');
            return;
        }
        setContactError(null);

        try {
            const shopData = {
                ...editingShop,
                openTime: `${editingShop.openTime.opening} to ${editingShop.openTime.closing}`
            };
            await updateShop(shopId, shopData);
            toast.success('Shop updated successfully');
            navigate('/dashboard/shopsadmin'); // Redirect after updating
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            toast.error('Error updating shop');
            console.error('Error updating shop:', err);
        }
    };

    // Handler for input changes
    const handleInputChange = (e) => {
        setEditingShop({
            ...editingShop,
            [e.target.name]: e.target.value,
        });
    };

    // Handle changes for the open time dropdowns
    const handleTimeChange = (e) => {
        setEditingShop({
            ...editingShop,
            openTime: {
                ...editingShop.openTime,
                [e.target.name]: e.target.value,
            },
        });
    };

    const times = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
    ];

    return (
        <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 mb-5">
            <h2 className="text-center mb-6 text-3xl font-semibold text-gray-800" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Update Shop</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* Form container */}
            <form onSubmit={handleUpdateShop} className="space-y-6">
                {/* Shop Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Shop Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter shop name"
                        value={editingShop.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    />
                </div>

                {/* Shop Type Dropdown */}
                <div>
                    <label htmlFor="shopType" className="block text-sm font-medium text-gray-700">Shop Type</label>
                    <select
                        name="shopType"
                        id="shopType"
                        value={editingShop.shopType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    >
                        <option value="" disabled>Select Shop Type</option>
                        <option value="clothing">Clothing</option>
                        <option value="food">Food</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="grocery">Grocery</option>
                        <option value="cosmetics">Cosmetics</option>
                        <option value="health">Health & Wellness</option>
                        <option value="sports">Sports Equipment</option>
                        <option value="books">Books & Magazines</option>
                        <option value="toys">Toys & Games</option>
                    </select>
                </div>

                {/* Open Time Select Inputs */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Open Time</label>
                    <div className="flex space-x-4 mt-1">
                        <select
                            name="opening"
                            value={editingShop.openTime.opening}
                            onChange={handleTimeChange}
                            className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            required
                        >
                            {times.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>

                        <select
                            name="closing"
                            value={editingShop.openTime.closing}
                            onChange={handleTimeChange}
                            className="block w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            required
                        >
                            {times.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Contact Number Input */}
                <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter contact number"
                        value={editingShop.contactNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    />
                    {contactError && (
                        <p className="text-red-600 text-sm mt-2">{contactError}</p>
                    )}
                </div>

                {/* Owner Email Input */}
                <div>
                    <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">Owner Email Address</label>
                    <input
                        type="email"
                        name="ownerEmail"
                        id="ownerEmail"
                        placeholder="Enter owner's email address"
                        value={editingShop.ownerEmail}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    />
                </div>

                {/* Location Dropdown */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                        name="location"
                        id="location"
                        value={editingShop.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    >
                        <option value="" disabled>Select Location</option>
                        <option value="1st floor">1st floor</option>
                        <option value="2nd floor">2nd floor</option>
                        <option value="3rd floor">3rd floor</option>
                        <option value="4th floor">4th floor</option>
                        <option value="6th floor">6th floor</option>
                        <option value="7th floor">7th floor</option>
                        <option value="8th floor">8th floor</option>
                    </select>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default UpdateShop;
