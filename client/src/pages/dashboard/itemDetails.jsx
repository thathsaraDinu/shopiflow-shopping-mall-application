import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import useProduct from '@/hooks/useProduct';
import { useParams } from 'react-router-dom';

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
import { deleteProductById } from '@/api/product.api';
import InventoryForm from '@/components/inventory/inventoryForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useProduct(id);
  const [open, setOpen] = useState(false);
  const detailsRef = useRef(null);

  const handleDelete = async () => {
    await deleteProductById(id);
    navigate('/inventory');
  };

  const handleDownloadPDF = () => {
    const input = detailsRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a landscape PDF (wide page)
      const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' is for landscape orientation

      // Get the width and height for the PDF
      const imgWidth = 297; // A4 landscape width in mm
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight =
        (canvas.height * imgWidth) / canvas.width; // Preserve aspect ratio

      let heightLeft = imgHeight;
      let position = 0;

      // Add the image to the PDF
      pdf.addImage(
        imgData,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;

      // Add additional pages if necessary
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

      // Save the PDF with the product name
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
              <li className="px-2 mr-10 border-b-2 border-blue-500 pb-3">
                Overview
              </li>
              <li className="px-2 mr-10">Adjustments</li>
            </ul>
          </div>
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
                  <p className="text-grey-600 w-1/2">40</p>
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
        </div>
      )}
    </>
  );
};

export default ItemDetails;
