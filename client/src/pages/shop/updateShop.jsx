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
        openTime: '',
        contactNumber: '',
        ownerEmail: '', // **Added new field for owner's email**
        shopType: '', // **Added new field for shop type**
    });
    const [contactError, setContactError] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                console.log("Fetching shop with ID:", shopId);
                const shopData = await getShopById(shopId);
                setEditingShop(shopData);
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

    // Handler to update a shop
    const handleUpdateShop = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateContactNumber(editingShop.contactNumber)) {
            setContactError('Contact number must start with 0 and be 10 digits long.');
            toast.error('Please provide a valid contact number');
            return;
        }
        setContactError(null);

        try {
            await updateShop(shopId, editingShop);
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

                {/* Shop Type Dropdown - **Newly Added Field** */}
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

                {/* Open Time Input */}
                <div>
                    <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">Open Time</label>
                    <input
                        type="text"
                        name="openTime"
                        id="openTime"
                        placeholder="Enter open time (e.g., 9:00 AM)"
                        value={editingShop.openTime}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    />
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

                {/* Owner Email Input - **Newly Added Field** */}
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

                {/* Dropdown for Location */}
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
