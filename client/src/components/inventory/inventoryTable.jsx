import React from 'react';
import { Button } from '@/components/ui/button';
import InventoryForm from './inventoryForm';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InventoryTable = ({ data, refetch }) => {
  const downloadPDF = async () => {
    const table = document.getElementById('inventoryTable');
    const canvas = await html2canvas(table, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      canvas.width,
      canvas.height,
    );
    pdf.save('inventory.pdf');
  };

  return (
    <>
      <div className="mt-5 bg-white rounded-lg pt-5 pb-3">
        <div className="flex items-end justify-between mx-4 mb-2">
          <h2 className="text-lg text-grey-800 font-medium">
            Products
          </h2>
          <div className="flex">
            <InventoryForm
              refetch={refetch}
              title="New Product"
              button={
                <Button className="bg-blue-500 mx-4 hover:shadow-none h-10 px-4 rounded-sm text-white text-sm hover:bg-blue-700 font-medium transition-all">
                  Add Product
                </Button>
              }
            />
            <Button
              onClick={downloadPDF}
              className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all"
            >
              Download All
            </Button>
          </div>
        </div>
        <table
          id="inventoryTable"
          className="w-full text-left text-sm"
        >
          <thead className="text-grey-500">
            <tr>
              <th className="font-medium p-4">Product</th>
              <th className="font-medium p-4">
                Buying Price
              </th>
              <th className="font-medium p-4">Quantity</th>
              <th className="font-medium p-4">
                Threshold Value
              </th>
              <th className="font-medium p-4">Supplier</th>
              <th className="font-medium p-4">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="text-grey-700 font-medium">
            {data.map((item) => (
              <tr
                key={item.productID}
                className="border-t border-grey-100"
              >
                <td className="px-4 py-[14px]">
                  <Link
                    className="flex items-center"
                    to={item.productID}
                  >
                    <img
                      className="mr-5 w-10 h-10"
                      src={item.image}
                      alt={item.name}
                    />
                    {item.name}
                  </Link>
                </td>
                <td className="px-4 py-[14px]">
                  ${parseFloat(item.buyingPrice).toFixed(2)}
                </td>
                <td className="px-4 py-[14px]">
                  {item.quantity}
                </td>
                <td className="px-4 py-[14px]">
                  {item.thresholdValue}
                </td>
                <td className="px-4 py-[14px]">
                  {item.supplier}
                </td>
                <td className="px-4 py-[14px] text-green">
                  In - Stock
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center my-2 mx-4">
          <Button className="bg-white h-9.5 px-4 hover:shadow-none border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
            Previous
          </Button>
          <div className="text-sm text-grey-700">
            Page <span className="font-medium">1</span> of{' '}
            <span className="font-medium">1</span>
          </div>
          <Button className="bg-white h-9.5 px-4 hover:shadow-none border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default InventoryTable;
