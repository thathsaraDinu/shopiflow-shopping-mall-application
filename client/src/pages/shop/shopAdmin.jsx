import { Button } from '@/components/ui/button';
import { getShops, deleteShop } from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const ShopAdmin = () => {
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

  // Generate report as PDF
  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Shop Report', 105, 20, null, null, 'center');

    // Group shops by location
    const shopsByLocation = shops.reduce((acc, shop) => {
      if (!acc[shop.location]) {
        acc[shop.location] = [];
      }
      acc[shop.location].push(shop);
      return acc;
    }, {});

    let y = 40; // Start position for the content

    Object.keys(shopsByLocation).forEach((location) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(`Location: ${location}`, 10, y);
      y += 10;

      shopsByLocation[location].forEach((shop) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(`- Shop Name: ${shop.name}`, 15, y);
        y += 6;
        doc.text(
          `  Contact Number: ${shop.contactNumber}`,
          15,
          y,
        );
        y += 6;
        doc.text(`  Open Time: ${shop.openTime}`, 15, y);
        y += 6;
        doc.text(
          `  Owner Email: ${shop.ownerEmail}`,
          15,
          y,
        );
        y += 6;
        doc.text(`  Shop Type: ${shop.shopType}`, 15, y);
        y += 10;

        // Check if y position is close to page bottom
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
    });

    doc.save('Shop_Report.pdf');
  };

  return (
    <div>
      <h1
        className="text-center mt-6 mb-6 text-4xl font-medium"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        Available Shops
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Link
        to={'/addshop'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-2"
      >
        Add Shop
      </Link>
      <Button
        onClick={generateReport}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-5 mt-2"
      >
        Generate Report
      </Button>

      {/* Display Shops */}
      {shops.map((shop) => (
        <div
          key={shop._id}
          className="m-5 p-4 border rounded shadow"
        >
          <div className="mt-2 mb-4">
            <h2
              className="text-lg font-medium"
              style={{
                fontFamily: 'Righteous, sans-serif',
                fontSize: '30px',
              }}
            >
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
            Owner Email: {shop.ownerEmail}
          </p>
          <p className="text-base text-gray-600">
            Shop Type: {shop.shopType}
          </p>
          <Link to={`/updateshop/${shop._id}`}>
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

export default ShopAdmin; // Updated to use PascalCase naming convention
