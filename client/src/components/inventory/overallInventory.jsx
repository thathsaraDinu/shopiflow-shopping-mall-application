import React from 'react';

const OverallInventory = () => {
  return (
    <>
      <div className="px-4 py-5 bg-white rounded-lg mt-6 shadow-sm">
        <h2 className="text-grey-800 text-xl font-medium mb-5">
          Overall Inventory
        </h2>
        <div className="flex justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-blue-500 mb-3">
              Categories
            </h4>
            <p className="font-semibold text-grey-600 mb-3">
              14
            </p>
            <p className="text-grey-400">Last 7 days</p>
          </div>
          <div className="flex-1 px-10 border-l border-grey-50">
            <h4 className="font-semibold text-orange mb-3">
              Total Products
            </h4>
            <div>
              <div className="flex justify-between font-semibold text-grey-600 mb-3">
                <p>868</p>
                <p>₹25000</p>
              </div>
              <div className="flex justify-between text-grey-400">
                <p>Last 7 days</p>
                <p>Revenue</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-10 border-l border-grey-50">
            <h4 className="font-semibold text-purple mb-3">
              Top Selling
            </h4>
            <div>
              <div className="flex justify-between font-semibold text-grey-600 mb-3">
                <p>5</p>
                <p>₹2500</p>
              </div>
              <div className="flex justify-between text-grey-400">
                <p>Last 7 days</p>
                <p>Cost</p>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-10 border-l border-grey-50">
            <h4 className="font-semibold text-red mb-3">
              Low Stocks
            </h4>
            <div>
              <div className="flex justify-between font-semibold text-grey-600 mb-3">
                <p>12</p>
                <p>2</p>
              </div>
              <div className="flex justify-between text-grey-400">
                <p>Ordered</p>
                <p>Not in stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallInventory;
