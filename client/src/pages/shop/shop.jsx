import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getShops, createShop, updateShop, deleteShop } from '@/api/shop.api';
import { useEffect, useState } from 'react';

const Shop = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState({ name: '', location: '', openTime: '', items: [] });
  const [editingShop, setEditingShop] = useState(null); // To hold the shop currently being edited
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

  // Handler to create a new shop
  const handleAddShop = async () => {
    try {
      await createShop(newShop);
      fetchShops(); // Refresh shops list after adding
    } catch (err) {
      setError('Error creating shop');
    }
  };

  // Handler to update a shop
  const handleUpdateShop = async (shopId, updatedData) => {
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
    try {
      await deleteShop(shopId);
      fetchShops(); // Refresh shops list after deleting
    } catch (err) {
      setError('Error deleting shop');
    }
  };
  }

  try {
    await deleteShop(shopId);
    fetchShops(); // Refresh shops list after deleting
  } catch (err) {
    setError('Error deleting shop');
  }
};

  const joinQueueHandler = (shopID, shopName) => {
    navigate(`/queue/${shopID}`, { state: { shopName } });
  };
  
  // Handler for the add shop form input change
  const handleInputChange = (e) => {
    setNewShop({ ...newShop, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Shops</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Add Shop Form */}
      <div className="p-4 border rounded mb-5">
  <h2>Add New Shop</h2>
  <input
    type="text"
    name="name"
    placeholder="Shop Name"
    value={newShop.name}
    onChange={handleInputChange}
    className="border p-2 m-2"
  />
  
  {/* Dropdown for Location */}
  <select
    name="location"
    value={newShop.location}
    onChange={handleInputChange}
    className="border p-2 m-2"
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

  <input
    type="text"
    name="openTime"
    placeholder="Open Time"
    value={newShop.openTime}
    onChange={handleInputChange}
    className="border p-2 m-2"
  />

  <Button onClick={handleAddShop} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
    Add Shop
  </Button>
</div>


      {/* Display Shops */}
      {shops.map((shop) => (
        <div key={shop._id} className="m-5 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">{shop.name}</h2>
          <p className="text-sm text-gray-600">Location: {shop.location}</p>
          <p className="text-sm text-gray-600">Open Time: {shop.openTime}</p>

          <Button
            onClick={() => joinQueueHandler(shop._id, shop.name)} // Assuming you have a route for viewing virtual queue
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            View Virtual Queue
          </Button>
          <Button
            onClick={() => setEditingShop(shop)} // Set shop to be edited
            className="bg-orange hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
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
            onChange={(e) => setEditingShop({ ...editingShop, name: e.target.value })}
            className="border p-2 m-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editingShop.location}
            onChange={(e) => setEditingShop({ ...editingShop, location: e.target.value })}
            className="border p-2 m-2"
          />
          <input
            type="text"
            name="openTime"
            placeholder="Open Time"
            value={editingShop.openTime}
            onChange={(e) => setEditingShop({ ...editingShop, openTime: e.target.value })}
            className="border p-2 m-2"
          />
          <Button
            onClick={() => handleUpdateShop(editingShop._id, editingShop)}
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
