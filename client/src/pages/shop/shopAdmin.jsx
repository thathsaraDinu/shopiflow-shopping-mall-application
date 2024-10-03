import { Button } from '@/components/ui/button';
import {
    getShops,
    deleteShop,
} from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Chart } from 'chart.js';

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

    // Generate report as PDF
    const generateReport = async () => {
        const chartImage = await createChart();

        const doc = new jsPDF();
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('SHOP Report', 105, 20, null, null, 'center');

        // Add chart image to PDF
        doc.addImage(chartImage, 'PNG', 15, 30, 180, 100);

        // Group shops by location
        const shopsByLocation = shops.reduce((acc, shop) => {
            if (!acc[shop.location]) {
                acc[shop.location] = [];
            }
            acc[shop.location].push(shop);
            return acc;
        }, {});

        let y = 140; // Start position for the content

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
                doc.text(`  Contact Number: ${shop.contactNumber}`, 15, y);
                y += 6;
                doc.text(`  Open Time: ${shop.openTime}`, 15, y);
                y += 6;
                doc.text(`  Owner Email: ${shop.ownerEmail}`, 15, y);
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

    // Function to create a chart and return its image data
    const createChart = () => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set a larger size for the canvas
            const width = 800; // Desired width
            const height = 400; // Desired height
            canvas.width = width;
            canvas.height = height;

            // Group shops by floor extracted from location
            const shopsByFloor = shops.reduce((acc, shop) => {
                const floorMatch = shop.location.match(/(\d+)(st|nd|rd|th) Floor/i);
                const floor = floorMatch ? `${floorMatch[1]} Floor` : 'Ground Floor'; // Default to 'Ground Floor' if no match

                if (!acc[floor]) {
                    acc[floor] = 0;
                }
                acc[floor]++;
                return acc;
            }, {});

            // Prepare data for the chart
            const data = {
                labels: Object.keys(shopsByFloor),
                datasets: [{
                    label: 'Number of Shops per Floor',
                    data: Object.values(shopsByFloor),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            };

            // Create the chart
            const chart = new Chart(ctx, {
                type: 'bar', // Change type as needed
                data: data,
                options: {
                    responsive: false,
                    maintainAspectRatio: false, // Disable maintaining aspect ratio
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1, // Ensure increments of 1 on the y-axis
                                precision: 0, // Ensure only integer values are displayed
                            },
                            title: {
                                display: true,
                                text: 'Number of Shops',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Floor Number',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14, // Increase font size for legend
                                },
                            },
                        },
                        title: {
                            display: true,
                            text: 'Shop Distribution by Floor',
                            font: {
                                size: 18, // Increase font size for title
                            },
                        },
                    },
                },
            });

            // Wait for the chart to be rendered
            setTimeout(() => {
                const chartImage = canvas.toDataURL('image/png', 1.0); // High-quality image
                resolve(chartImage);
            }, 500); // Adjust delay as necessary
        });
    };

    return (
        <div>
            <h1 className='text-center mt-6 mb-6 text-4xl font-medium' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Available Shops</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="flex justify-end mr-5 mt-2">

                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                    <Link
                        to={'/dashboard/addshop'}
                        style={{ padding: '10px 20px' }}
                    >
                        Add Shop
                    </Link>
                </Button>
                <Button
                    onClick={generateReport}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-2"
                    style={{ padding: '10px 20px' }}
                >
                    Generate Report
                </Button>
            </div>



            {/* Display Shops */}
            {
                shops.map((shop) => (
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
                            Owner Email: {shop.ownerEmail}
                        </p>
                        <p className="text-base text-gray-600">
                            Shop Type: {shop.shopType}
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
                ))
            }
        </div >
    );
};

export default ShopAdmin;
