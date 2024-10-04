import {
  deletePromotion,
  getPromotions,
} from '@/api/promotion.api';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
import { PromotionReportDownload } from './promotionreport/promotionreportdownload';
import AddPromotionMain from './addpromotionmain';
import { DeleteModal } from '@/components/modals/delete';
import toast from 'react-hot-toast';

export default function AllPromotions() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    enabled: true,
  });

  const discounts =
    data?.data.promotions.discountPercentage;
  const amounts = data?.data.promotions.discountAmount;
  const [promotionType, setPromotionType] = useState('1');
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  const [loading, setLoading] = useState(false);

  const editPromotion = async (id) => {
    console.log('Edit clicked');
  };

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
      console.error('Error downloading the report:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Filter promotions based on search query
  const filteredDiscounts = discounts?.filter((promotion) =>
    promotion.storeName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );
  const filteredAmounts = amounts?.filter((promotion) =>
    promotion.storeName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="my-10 mx-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-xl m-5 font-semibold tracking-tight">
          All Promotions
        </h3>
        <div className="flex gap-6">
          <input
            type="text"
            placeholder="Search promotions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 mr-5 border rounded-md w-56 appearance-none focus:outline-none text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          <AddPromotionMain
            refetch={refetch}
            isUpdate={false}
          />

          <Button
            disabled={loading}
            onClick={handleClick}
            className="bg-red-500 text-white text-sm transition rounded-md px-5 py-5 hover:bg-red-600"
          >
            {loading ? 'Loading...' : 'Download Report'}
          </Button>
        </div>
      </div>

      {/* Search Input */}

      <div>
        <div className="relative flex pt-4 gap-5 justify-start ">
          <div className="flex flex-col items-center">
            <h4
              onClick={() => setPromotionType('1')}
              className={`transition-all duration-300 rounded-lg cursor-pointer text-center py-2 px-5 scroll-m-20 text-base font-semibold`}
            >
              Discount By Percentage
            </h4>
            <hr
              className={`z-10 ${promotionType == 1 ? 'border-2 border-black w-full' : 'border-2 w-0'} transition-all duration-300`}
            ></hr>
          </div>
          <div className="flex flex-col items-center">
            <h4
              onClick={() => setPromotionType('2')}
              className={`transition-all duration-300 rounded-lg cursor-pointer text-center py-2 px-5 scroll-m-20 text-base font-semibold`}
            >
              Discount By Amount
            </h4>
            <hr
              className={`z-10 ${promotionType == 2 ? 'border-2 border-black w-full' : 'border-2 w-0'} transition-all duration-300`}
            ></hr>
          </div>
          <hr className="border-2 absolute bottom-0 w-full z-0"></hr>
        </div>

        <div className="m-5">
          {promotionType == 1 ? (
            <Table className="max-w-[1150px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black w-1/6">
                    Store Name
                  </TableHead>
                  <TableHead className="text-black w-1/6">
                    Percentage
                  </TableHead>
                  <TableHead className="text-black w-1/3">
                    Description
                  </TableHead>
                  <TableHead className="text-black w-1/6">
                    Start Date
                  </TableHead>
                  <TableHead className="text-black w-1/6">
                    End Date
                  </TableHead>
                  <TableHead className="text-black w-1/6">
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

                {filteredDiscounts &&
                filteredDiscounts.length > 0 ? (
                  filteredDiscounts.map((promotion) => (
                    <TableRow key={promotion._id}>
                      {/* Apply consistent styles to the table cells */}
                      <TableCell>
                        {promotion.storeName}
                      </TableCell>
                      <TableCell>
                        {promotion.discountPercentage}%
                      </TableCell>
                      <TableCell>
                        {promotion.description}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          promotion.startDate,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          promotion.endDate,
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-5 items-center">
                        {/* Keep the same actions styling */}
                        <AddPromotionMain
                          refetch={refetch}
                          promotion={promotion}
                          isUpdate={true}
                        />
                        <DeleteModal
                          btnClassName="w-8 mt-0 p-1 h-8 bg-white border-none"
                          title={'Delete Promotion'}
                          description={`Are you sure you want to delete ${promotion.storeName} promotion?`}
                          onYes={async () => {
                            try {
                              const res =
                                await deletePromotion(
                                  promotion._id,
                                  promotionType,
                                );
                              toast.success(
                                'Promotion deleted successfully',
                              );
                              refetch(); // Re-fetch the updated data after deletion
                            } catch (error) {
                              toast.error(
                                'Failed to delete promotion',
                              );
                              console.error(
                                'Error deleting promotion:',
                                error,
                              ); // Log the error for debugging
                            }
                          }}
                          btnText={
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
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          }
                        ></DeleteModal>
                      </TableCell>
                    </TableRow>
                  ))
                ) : !isLoading ? (
                  <div className="text-red-500 m-3">
                    No promotions found.
                  </div>
                ) : (
                  ''
                )}
              </TableBody>
            </Table>
          ) : (
            <Table className="max-w-[1150px]">
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black w-1/7">
                    Store Name
                  </TableHead>
                  <TableHead className="text-black w-1/7">
                    Qualifying Amount
                  </TableHead>
                  <TableHead className="text-black w-1/7">
                    Discount Amount
                  </TableHead>
                  <TableHead className="text-black w-2/7">
                    Description
                  </TableHead>
                  <TableHead className="text-black w-1/7">
                    Start Date
                  </TableHead>
                  <TableHead className="text-black w-1/7">
                    End Date
                  </TableHead>
                  <TableHead className="text-black w-1/7">
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
                {filteredAmounts &&
                filteredAmounts.length > 0 ? (
                  filteredAmounts.map((promotion) => (
                    <TableRow key={promotion._id}>
                      <TableCell>
                        {promotion.storeName}
                      </TableCell>
                      <TableCell>
                        {promotion.qualifyingPurchaseAmount}
                      </TableCell>
                      <TableCell>
                        {promotion.discountAmount}
                      </TableCell>
                      <TableCell>
                        {promotion.description}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          promotion.startDate,
                        ).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          promotion.endDate,
                        ).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell className="flex gap-5 items-center">
                        <AddPromotionMain
                          refetch={refetch}
                          promotion={promotion}
                          isUpdate={true}
                        />
                        <DeleteModal
                          btnClassName="w-8 mt-0 p-1 h-8 bg-white border-none"
                          title={'Delete Promotion'}
                          description={`Are you sure you want to delete ${promotion.storeName} promotion?`}
                          onYes={async () => {
                            try {
                              const res =
                                await deletePromotion(
                                  promotion._id,
                                  promotionType,
                                );
                              toast.success(
                                'Promotion deleted successfully',
                              );
                              refetch(); // Re-fetch the updated data after deletion
                            } catch (error) {
                              toast.error(
                                'Failed to delete promotion',
                              );
                              console.error(
                                'Error deleting promotion:',
                                error,
                              ); // Log the error for debugging
                            }
                          }}
                          btnText={
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
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          }
                        ></DeleteModal>
                      </TableCell>
                    </TableRow>
                  ))
                ) : !isLoading ? (
                  <div className="text-red-500 m-3">
                    No promotions found.
                  </div>
                ) : (
                  ''
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
