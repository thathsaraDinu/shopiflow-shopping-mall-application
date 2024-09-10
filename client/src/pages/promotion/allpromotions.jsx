import { getPromotions } from '@/api/promotion.api';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PromotionReportDownload } from './promotionreport/promotionreportdownload';

export function AllPromotions() {
  const { data, isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
  });

  const discounts =
    data?.data.promotions.discountPercentage;
  const amounts = data?.data.promotions.discountAmount;
  const [promotionType, setPromotionType] = useState('1');
  console.log(data);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true); // Start loading

    try {
      if (promotionType === '1') {
        await PromotionReportDownload(
          discounts,
          promotionType,
        );
      } else {
        await PromotionReportDownload(
          amounts,
          promotionType,
        );
      }
    } catch (error) {
      // Handle any errors that occur during the download
      console.error('Error downloading the report:', error);
    } finally {
      setLoading(false); // End loading
    }
  };
  return (
    <div className="my-10 mx-3">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl m-5 font-semibold tracking-tight">
          All Promotions
        </h3>
        <div className="flex gap-6">
          <Link
            to={'/dashboard/addpromotion'}
            className="bg-blue-500 text-white text-sm rounded-lg px-5 py-3 hover:bg-blue-600"
          >
            Add Promotion
          </Link>
          <Link
            disabled={loading}
            onClick={handleClick}
            className="bg-rose-500 text-white text-sm rounded-lg px-5 py-3 hover:bg-rose-600"
          >
            {loading ? 'Loading...' : 'Download Report'}
          </Link>
        </div>
      </div>

      <div className=" flex py-4 justify-around ">
        <h4
          onClick={() => setPromotionType('1')}
          className={`${promotionType == 1 ? 'bg-blue-200' : ''} transition-all duration-300  rounded-lg cursor-pointer text-center w-1/2 py-6 scroll-m-20 text-xl font-semibold tracking-tight`}
        >
          Discount By Percentage
        </h4>
        <h4
          onClick={() => setPromotionType('2')}
          className={`${promotionType == 2 ? 'bg-blue-200' : ''} transition-all duration-300 rounded-lg cursor-pointer text-center w-1/2 py-6 h-full underlined scroll-m-20 text-xl font-semibold tracking-tight`}
        >
          Discount By Amount
        </h4>
      </div>
      <div>
        {promotionType == 1 ? (
          <Table>
            <TableCaption>
              
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">
                  Store Name
                </TableHead>
                <TableHead className="text-black">
                  Applicable Items
                </TableHead>
                <TableHead className="text-black">
                  Discount Percentage
                </TableHead>
                <TableHead className="text-black">
                  Description
                </TableHead>
                <TableHead className="text-black">
                  Start Date
                </TableHead>
                <TableHead className="text-black">
                  End Date
                </TableHead>
                <TableHead className="text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <p className="text-blue-400 font-semibold text-md italic">
                  Loading...
                </p>
              )}

              {discounts && discounts.length > 0
                ? discounts.map((promotion) => (
                    <TableRow>
                      <TableHead>
                        {promotion.storeName}
                      </TableHead>
                      <TableHead>
                        {promotion.applicableItems.join(
                          ', ',
                        )}
                      </TableHead>
                      <TableHead>
                        {promotion.discountPercentage}
                      </TableHead>
                      <TableHead>
                        {promotion.description}
                      </TableHead>
                      <TableHead>
                        {new Date(
                          promotion.startDate,
                        ).toLocaleDateString(
                          promotion.startDateformat,
                          'yyyy-MM-dd',
                        )}
                      </TableHead>
                      <TableHead>
                        {new Date(
                          promotion.endDate,
                        ).toLocaleDateString(
                          promotion.endDateformat,
                          'yyyy-MM-dd',
                        )}
                      </TableHead>
                      <TableHead className="flex gap-5 items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="#5F9EA0"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                            fill="#0000FF"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>

                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                            fill="red"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </TableHead>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableCaption>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">
                  Store Name
                </TableHead>
                <TableHead className="text-black">
                  Qualifying Purchase Amount
                </TableHead>
                <TableHead className="text-black">
                  Discount Amount
                </TableHead>
                <TableHead className="text-black">
                  Description
                </TableHead>
                <TableHead className="text-black">
                  Start Date
                </TableHead>
                <TableHead className="text-black">
                  End Date
                </TableHead>
                <TableHead className="text-black">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <p className="text-blue-400 font-semibold text-md italic">
                  Loading...
                </p>
              )}
              {amounts && amounts.length > 0
                ? amounts.map((promotion) => (
                    <TableRow>
                      <TableHead>
                        {promotion.storeName}
                      </TableHead>
                      <TableHead>
                        {promotion.qualifyingPurchaseAmount}
                      </TableHead>
                      <TableHead>
                        {promotion.discountAmount}
                      </TableHead>
                      <TableHead>
                        {promotion.description}
                      </TableHead>
                      <TableHead>
                        {new Date(
                          promotion.startDate,
                        ).toLocaleDateString(
                          promotion.startDateformat,
                          'yyyy-MM-dd',
                        )}
                      </TableHead>
                      <TableHead>
                        {new Date(
                          promotion.endDate,
                        ).toLocaleDateString(
                          promotion.endDateformat,
                          'yyyy-MM-dd',
                        )}
                      </TableHead>
                      <TableHead className="flex gap-5 items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="#5F9EA0"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                            fill="#0000FF"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>

                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                            fill="red"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </TableHead>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
