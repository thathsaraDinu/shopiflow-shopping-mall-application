import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import useProduct from '@/hooks/useProduct';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteProductById,
  updateProduct,
} from '@/api/product.api';
import InventoryForm from '@/components/inventory/inventoryForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from 'react';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useProduct(id);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [thresholdValue, setThresholdValue] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const detailsRef = useRef(null);

  useEffect(() => {
    if (data) {
      setQuantity(data.quantity);
      setThresholdValue(data.thresholdValue);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    data.quantity = quantity;
    data.thresholdValue = thresholdValue;

    try {
      await updateProduct(data);
      toast.success('Stock updated successfully');
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await deleteProductById(id);
    navigate('/inventory');
  };

  const handleDownloadPDF = () => {
    const input = detailsRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('l', 'mm', 'a4');

      const imgWidth = 297;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        imgData,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
        );
        heightLeft -= pageHeight;
      }

      pdf.save(`${data.name}_details.pdf`);
    });
  };

  return (
    <>
      {data && (
        <div className="p-4 mt-6 bg-white  mb-10 overflow-hidden rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-grey-800">
              {data.name}
            </h2>
            <div className="flex">
              <InventoryForm
                refetch={refetch}
                task="edit"
                title="Edit Product"
                data={data}
                button={
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
                }
              />

              <AlertDialog
                open={open}
                onOpenChange={setOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This
                      will permanently delete the product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                onClick={() => setOpen(true)}
                className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-red hover:bg-white text-sm font-medium transition-all mx-3"
              >
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

              <Button
                onClick={handleDownloadPDF}
                className="bg-white hover:shadow-none h-10 px-4 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all"
              >
                Download
              </Button>
            </div>
          </div>
          <div className="border-b border-grey-50 mb-5">
            <ul className="flex text-grey-700">
              <li
                onClick={() => setActiveTab('overview')}
                className={`px-2 mr-10 ${activeTab === 'overview' && 'border-b-2 border-blue-500'} pb-3 cursor-pointer`}
              >
                Overview
              </li>
              <li
                onClick={() => setActiveTab('adjustments')}
                className={`px-2 mr-10 ${activeTab === 'adjustments' && 'border-b-2 border-blue-500'} pb-3 cursor-pointer`}
              >
                Adjustments
              </li>
            </ul>
          </div>
          {activeTab === 'overview' ? (
            <div ref={detailsRef} className="flex">
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
                      {data.name}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Product ID
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.productID}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Product category
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.category}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Supplier name
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.supplier}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Buying Price
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.buyingPrice}
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
                    <p className="text-grey-600 w-1/2">
                      {data.quantity}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Remaining Stock
                    </p>
                    <p className="text-grey-600 w-1/2">
                      40
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Unit Price
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.unitPrice}
                    </p>
                  </div>
                  <div className="flex mb-8">
                    <p className="text-grey-400 w-1/2">
                      Threshold value
                    </p>
                    <p className="text-grey-600 w-1/2">
                      {data.thresholdValue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 h-[170px] w-[170px] border-dashed border-2 border-[#9D9D9D] rounded-sm mb-[60px] overflow-hidden">
                {data.image && (
                  <img
                    className="w-full h-full"
                    src={data.image}
                    alt="image"
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center w-[600px] mb-8">
                  <p className="text-grey-700 w-1/2">
                    Remaining Stock
                  </p>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={() =>
                        setQuantity(quantity - 1)
                      }
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                      value={quantity}
                      readOnly
                      required
                    />
                    <button
                      onClick={() =>
                        setQuantity(quantity + 1)
                      }
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center w-[600px] mb-8">
                  <p className="text-grey-700 w-1/2">
                    Threshold Value
                  </p>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      onClick={() =>
                        setThresholdValue(
                          thresholdValue - 1,
                        )
                      }
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                      value={thresholdValue}
                      readOnly
                      required
                    />
                    <button
                      onClick={() =>
                        setThresholdValue(
                          thresholdValue + 1,
                        )
                      }
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:shadow-none h-10 px-4 rounded-sm text-white text-sm hover:bg-blue-700 font-medium transition-all"
                >
                  Update Stock
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ItemDetails;
