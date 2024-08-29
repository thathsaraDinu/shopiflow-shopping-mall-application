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
import EditIcon from '@/assets/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import DeleteIcon from '@/assets/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="my-10 mx-3">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl m-5 font-semibold tracking-tight">
          All Promotions
        </h3>
        <div>
          <Link to={'/dashboard/addpromotion'} className="bg-blue-500 text-white text-sm rounded-lg px-5 py-3 hover:bg-blue-600">Add Promotion</Link>
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
        {isLoading && <p>Loading...</p>}

        <Table>
          <TableCaption>
            Promotions
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Applicable Items</TableHead>
              <TableHead>Discount Percentage</TableHead>

              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts && discounts.length > 0
              ? discounts.map((promotion) =>
                  promotion.applicableItems.map(
                    (applicableItem) => (
                      <TableRow>
                        <TableHead>
                          {promotion.storeName}
                        </TableHead>
                        <TableHead>
                          {applicableItem}
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
                          <img
                            className="cursor-pointer w-7 h-7"
                            src={EditIcon}
                            alt="Edit"
                          />

                          <img
                            className="cursor-pointer w-7 h-7"
                            src={DeleteIcon}
                            alt="Edit"
                          />
                        </TableHead>
                      </TableRow>
                    ),
                  ),
                )
              : ''}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
