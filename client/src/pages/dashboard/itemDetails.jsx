import React from 'react';
import { Button } from '@/components/ui/button';

const ItemDetails = () => {
  return (
    <>
      <div className="p-4 mt-6 bg-white  mb-10 overflow-hidden rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-grey-800">
            Product Name
          </h2>
          <div className="flex">
            <Button className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-grey-600 mr-2"
              >
                <g clipPath="url(#clip0_443_6232)">
                  <path
                    d="M14.1665 2.49993C14.3854 2.28106 14.6452 2.10744 14.9312 1.98899C15.2171 1.87054 15.5236 1.80957 15.8332 1.80957C16.1427 1.80957 16.4492 1.87054 16.7352 1.98899C17.0211 2.10744 17.281 2.28106 17.4998 2.49993C17.7187 2.7188 17.8923 2.97863 18.0108 3.2646C18.1292 3.55057 18.1902 3.85706 18.1902 4.16659C18.1902 4.47612 18.1292 4.78262 18.0108 5.06859C17.8923 5.35455 17.7187 5.61439 17.4998 5.83326L6.24984 17.0833L1.6665 18.3333L2.9165 13.7499L14.1665 2.49993Z"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_443_6232">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              Edit
            </Button>
            <Button className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-red hover:bg-white text-sm font-medium transition-all mx-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red mr-1"
              >
                <path
                  d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9 6V3H15V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10 10V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M14 10V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Delete
            </Button>
            <Button className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
              Download
            </Button>
          </div>
        </div>
        <div className="border-b border-grey-50 mb-5">
          <ul className="flex text-grey-700">
            <li className="px-2 mr-10 border-b-2 border-blue-500 pb-3">
              Overview
            </li>
            <li className="px-2 mr-10">Purchases</li>
            <li className="px-2 mr-10">Adjustments</li>
            <li className="px-2 mr-10">History</li>
          </ul>
        </div>
        <div className="flex">
          <div className="ml-2 w-1/3">
            <h3 className="font-semibold text-grey-700 mb-4">
              Primary Details
            </h3>
            <div className="grid font-medium text-sm max-w-[500px]">
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Product name
                </p>
                <p className="text-grey-600 w-1/2">
                  T-Shirt
                </p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Product ID
                </p>
                <p className="text-grey-600 w-1/2">
                  PID001
                </p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Product category
                </p>
                <p className="text-grey-600 w-1/2">
                  T-Shirt
                </p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Supplier name
                </p>
                <p className="text-grey-600 w-1/2">
                  Addidas
                </p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Buying Price
                </p>
                <p className="text-grey-600 w-1/2">
                  1200.00
                </p>
              </div>
            </div>
          </div>
          <div className="mx-10 w-1/3 mt-10">
            <div className="grid font-medium text-sm max-w-[500px] mx-auto">
              <div className="flex mb-8 ">
                <p className="text-grey-400 w-1/2">
                  Opening Stock
                </p>
                <p className="text-grey-600 w-1/2">40</p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Remaining Stock
                </p>
                <p className="text-grey-600 w-1/2">34</p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  On the way
                </p>
                <p className="text-grey-600 w-1/2">15</p>
              </div>
              <div className="flex mb-8">
                <p className="text-grey-400 w-1/2">
                  Threshold value
                </p>
                <p className="text-grey-600 w-1/2">12</p>
              </div>
            </div>
          </div>
          <div className="mt-10 h-[170px] w-[170px] border-dashed border-2 border-[#9D9D9D] rounded-sm mb-[60px]"></div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
