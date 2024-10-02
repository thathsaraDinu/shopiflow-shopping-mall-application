import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { createShop } from '@/api/shop.api';
import toast from 'react-hot-toast';

const AddShop = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [newShop, setNewShop] = useState({
        name: '',
        location: '',
        openTime: '',
        contactNumber: '',
        items: [],
    });
    const [contactError, setContactError] = useState(null);
    const [error, setError] = useState(null);

    // Validate contact number
    const validateContactNumber = (number) => {
        return /^0\d{9}$/.test(number);
    };

    // Handler to create a new shop
    const handleAddShop = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        if (!validateContactNumber(newShop.contactNumber)) {
            setContactError(
                'Contact number must start with 0 and be 10 digits long.',
            );
            toast.error('Please provide a valid contact number');
            return;
        }
        setContactError(null);

        try {
            await createShop(newShop);
            toast.success('Shop created successfully');
            navigate('shopsadmin');
            setNewShop({
                name: '',
                location: '',
                openTime: '',
                contactNumber: '',
                items: [],
            });
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Error creating shop');
            toast.error('Error creating shop');
        }
    };

    // Handler for the add shop form input change
    const handleInputChange = (e) => {
        setNewShop({
            ...newShop,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white mt-5 mb-5">
            <h2 className="text-center mb-6 text-3xl font-semibold text-gray-800" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Add New Shop</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* Form container */}
            <form onSubmit={handleAddShop} className="space-y-6">
                {/* Shop Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Shop Name</label>
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

                {/* Location Dropdown */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                        name="location"
                        id="location"
                        value={newShop.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
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

                {/* Open Time Input */}
                <div>
                    <label htmlFor="openTime" className="block text-sm font-medium text-gray-700">Open Time</label>
                    <input
                        type="text"
                        name="openTime"
                        id="openTime"
                        placeholder="Enter open time (e.g., 9:00 AM)"
                        value={newShop.openTime}
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
                        value={newShop.contactNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        required
                    />
                    {contactError && (
                        <p className="text-red-600 text-sm mt-2">{contactError}</p>
                    )}
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
