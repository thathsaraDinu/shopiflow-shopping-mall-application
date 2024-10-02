import { Button } from '@/components/ui/button';
import {
    getShops,
    deleteShop,
} from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShopAdmin = () => { // **Updated the component name to follow PascalCase convention**
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    // Handler to delete a shop
    const handleDeleteShop = async (shopId) => {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this shop?'
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

            {/* Display Shops */}
            {shops.map((shop) => (
                <div
                    key={shop._id}
                    className="m-5 p-4 border rounded shadow"
                >
                    <div className='mt-2 mb-4'>
                        <h2 className="text-lg font-medium" style={{ fontFamily: 'Righteous, sans-serif', fontSize: '30px' }}>
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
                    {/* Display newly added fields */}
                    <p className="text-base text-gray-600">
                        Owner Email: {shop.ownerEmail} {/* **Newly Added Field** */}
                    </p>
                    <p className="text-base text-gray-600">
                        Shop Type: {shop.shopType} {/* **Newly Added Field** */}
                    </p>
                    <Link
                        to={`/dashboard/updateshop/${shop._id}`}
                    >
                        <Button className="bg-green hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 ml-0">
                            Update Shop
                        </Button>
                    </Link>

                    <Button
                        onClick={() => handleDeleteShop(shop._id)}
                        className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                    >
                        Delete Shop
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ShopAdmin; // **Updated to use PascalCase naming convention**
