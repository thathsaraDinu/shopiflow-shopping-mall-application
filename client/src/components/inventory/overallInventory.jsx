import React from 'react';

const OverallInventory = ({ totalProducts }) => {
  return (
    <>
      <div className="px-4 py-5 bg-white rounded-lg mt-6 shadow-lg max-w-screen-md">
        <h2 className="text-grey-800 text-xl font-medium mb-5">
          Overall Inventory
        </h2>
        <div className="flex justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-blue-500 mb-3">
              Categories
            </h4>
            <p className="font-semibold text-grey-600 mb-3">
              4
            </p>
          </div>
          <div className="flex-1 px-10 border-l border-grey-50">
            <h4 className="font-semibold text-orange mb-3">
              Total Products
            </h4>
            <div>
              <div className="flex justify-between font-semibold text-grey-600 mb-3">
                <p>{totalProducts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallInventory;
