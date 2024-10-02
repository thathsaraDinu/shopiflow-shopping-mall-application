import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
    getShops,
    createShop,
    updateShop,
    deleteShop,
} from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [newShop, setNewShop] = useState({
        name: '',
        location: '',
        openTime: '',
        contactNumber: '',
        items: [],
    });
    const [editingShop, setEditingShop] = useState(null); // To hold the shop currently being edited
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contactError, setContactError] = useState(null);

    // Fetch the shops data
    const fetchShops = async () => {
        setLoading(true);
        try {
            const data = await getShops();
            setShops(data);
            setError(null);
        } catch (err) {
            setError('Error fetching shops');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    // Validate contact number
    const validateContactNumber = (number) => {
        return /^0\d{9}$/.test(number);
    };

    // Handler to create a new shop
    const handleAddShop = async () => {
        if (!validateContactNumber(newShop.contactNumber)) {
            setContactError(
                'Contact number must start with 0 and be 10 digits long.',
            );
            return;
        }
        setContactError(null);
        try {
            await createShop(newShop);
            fetchShops(); // Refresh shops list after adding
            setNewShop({
                name: '',
                location: '',
                openTime: '',
                contactNumber: '',
                items: [],
            }); // Clear the form
        } catch (err) {
            setError('Error creating shop');
        }
    };

    // Handler to update a shop
    const handleUpdateShop = async (shopId, updatedData) => {
        if (!validateContactNumber(updatedData.contactNumber)) {
            setContactError(
                'Contact number must start with 0 and be 10 digits long.',
            );
            return;
        }
        setContactError(null);
        try {
            await updateShop(shopId, updatedData);
            fetchShops(); // Refresh shops list after updating
            setEditingShop(null); // Clear editing state
        } catch (err) {
            setError('Error updating shop');
        }
    };

    // Handler to delete a shop
    const handleDeleteShop = async (shopId) => {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this shop?',
        );

        if (!isConfirmed) {
            return;
        }

        try {
            await deleteShop(shopId);
            fetchShops();
        } catch (err) {
            setError('Error deleting shop');
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
        <div>
            <h1 className='text-center mt-6 mb-6 text-4xl font-medium' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Available Shops</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
                <Link
            to={'/dashboard/addshop'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-2"
          >
            Add Shop
          </Link>

                <div className="flex gap-6">
        </div>

            {/* Display Shops */}
            {shops.map((shop) => (
                <div
                    key={shop._id}
                    className="m-5 p-4 border rounded shadow"
                >
                    <div className='mt-2 mb-4'>
                        <h2 className="text-lg font-medium " style={{ fontFamily: 'Righteous, sans-serif', fontSize: '30px' }}>
                            {shop.name}
                        </h2>
                    </div>
                    <p className="text-base text-gray-600">
                        Location: {shop.location}
                    </p>
                    <p className="text-base text-gray-600">
                        Open Time: {shop.openTime}
                    </p>
                    <p className="text-base text-gray-600">
                        Contact Number: {shop.contactNumber}
                    </p>
                    <Button
                        onClick={() => setEditingShop(shop)}
                        className="bg-orange hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-0"
                    >
                        Update Shop
                    </Button>
                    <Button
                        onClick={() => handleDeleteShop(shop._id)}
                        className="bg-red hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                    >
                        Delete Shop
                    </Button>
                </div>
            ))}

            {/* Edit Shop Form */}
            {editingShop && (
                <div className="p-4 border rounded mb-5">
                    <h2>Edit Shop</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Shop Name"
                        value={editingShop.name}
                        onChange={(e) =>
                            setEditingShop({
                                ...editingShop,
                                name: e.target.value,
                            })
                        }
                        className="border p-2 m-2"
                    />

                    {/* Dropdown for Location in Edit Form */}
                    <select
                        name="location"
                        value={editingShop.location}
                        onChange={(e) =>
                            setEditingShop({
                                ...editingShop,
                                location: e.target.value,
                            })
                        }
                        className="border p-2 m-2"
                    >
                        <option value="" disabled>
                            Select Location
                        </option>
                        <option value="1st floor">1st floor</option>
                        <option value="2nd floor">2nd floor</option>
                        <option value="3rd floor">3rd floor</option>
                        <option value="4th floor">4th floor</option>
                        <option value="6th floor">6th floor</option>
                        <option value="7th floor">7th floor</option>
                        <option value="8th floor">8th floor</option>
                    </select>

                    <input
                        type="text"
                        name="openTime"
                        placeholder="Open Time"
                        value={editingShop.openTime}
                        onChange={(e) =>
                            setEditingShop({
                                ...editingShop,
                                openTime: e.target.value,
                            })
                        }
                        className="border p-2 m-2"
                    />

                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={editingShop.contactNumber}
                        onChange={(e) =>
                            setEditingShop({
                                ...editingShop,
                                contactNumber: e.target.value,
                            })
                        }
                        className="border p-2 m-2"
                    />
                    {contactError && (
                        <p className="text-red-600">{contactError}</p>
                    )}

                    <Button
                        onClick={() =>
                            handleUpdateShop(editingShop._id, editingShop)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </Button>
                    <Button
                        onClick={() => setEditingShop(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Shop;
