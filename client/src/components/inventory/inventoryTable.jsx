import React from 'react';
import { Button } from '@/components/ui/button';
import InventoryForm from './inventoryForm';

const InventoryTable = () => {
  return (
    <>
      <div className="mt-5 bg-white rounded-lg pt-5 pb-3">
        <div className="flex items-end justify-between mx-4 mb-2">
          <h2 className="text-lg text-grey-800 font-medium">
            Products
          </h2>
          <div className="flex">
            <InventoryForm />
            <Button className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all mx-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-grey-600 inline-block mb-0.5 mr-2"
              >
                <path
                  d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filters
            </Button>
            <Button className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
              Download All
            </Button>
          </div>
        </div>
        <table className="w-full text-left text-sm">
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
            <tr className="border-t border-grey-100">
              <td className="px-4 py-[14px]">Product</td>
              <td className="px-4 py-[14px]">₹430</td>
              <td className="px-4 py-[14px]">43 Packets</td>
              <td className="px-4 py-[14px]">12 Packets</td>
              <td className="px-4 py-[14px]">43 Packets</td>
              <td className="px-4 py-[14px] text-green">
                In- stock
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center my-2 mx-4">
          <Button className="bg-white h-9.5 px-4 hover:shadow-none border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
            Previous
          </Button>
          <div className="text-sm text-grey-700">
            Page <span className="font-medium">1</span> of{' '}
            <span className="font-medium">10</span>
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
