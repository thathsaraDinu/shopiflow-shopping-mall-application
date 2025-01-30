import { getPromotionById } from '@/api/promotion.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';
import { LoadingSpinner } from '@/components/ui/spinner';
import { MdOutlineDateRange } from 'react-icons/md';

export default function PromotionDetails() {
  const { type, id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['promotions', id],
    queryFn: () => getPromotionById(id, type),
    enabled: true,
  });

  const promotiondetailscss =
    'flex flex-col lg:flex-row gap-5 justify-center xl:w-[800px] md:w-[600px] w-[300px] transition-all ease-in-out';

  return (
    <div className="mx-20 py-10 flex flex-col gap-10 items-center">
        <h2 className="text-3xl italic font-bold bg-gradient-to-r text-center mb-6 from-blue-600 to-purple bg-clip-text text-transparent">
        {data && data.data.promotion.promoTitle}
      </h2>
      <div className="flex gap-10">
        <div className="">
          {isLoading ? (
            <div className="col-span-5 h-96 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">
              Error
            </p>
          ) : (
            data && (
              <div className={promotiondetailscss}>
                {/* Image at the top */}
                <img
                  src={data.data.promotion.photo}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="flex flex-col lg:gap-5 gap-3 justify-start lg:mt-5">
                  {/* Date Range */}
                  <div className="flex justify-start items-center gap-2 lg:w-[300px] text-sm text-gray-600">
                    <MdOutlineDateRange className="h-4 w-4" />
                    <div>
                      <span>
                        {new Date(
                          data.data.promotion.startDate,
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="mx-2">-</span>
                      <span>
                        {new Date(
                          data.data.promotion.endDate,
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <hr className="border" />

                  {/* Store Name and Discounts */}
                  <div className="flex flex-col gap-2 lg:gap-5">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {data.data.promotion.storeName}
                      </h2>
                    </div>
                    {/* Conditional Rendering for Discount */}
                    {type === 'type1' ? (
                      <span className="text-gray-700">
                        Discounts Upto{' '}
                        <span className="font-bold">
                          {' '}
                          {
                            data.data.promotion
                              .discountPercentage
                          }
                        </span>
                        %
                      </span>
                    ) : (
                      <span className="text-gray-700">
                        Discounts Upto{' '}
                        <span className="text-black font-bold">
                          {
                            data.data.promotion
                              .discountAmount
                          }{' '}
                          LKR
                        </span>{' '}
                        on{' '}
                        <span className="text-black font-bold">
                          {
                            data.data.promotion
                              .qualifyingPurchaseAmount
                          }{' '}
                          LKR{' '}
                        </span>{' '}
                        worth of purchase
                      </span>
                    )}{' '}
                    <p className="text-gray-600">
                      {data.data.promotion.description}
                    </p>
                  </div>

                  {/* Description */}
                </div>

                {/* Other Promotion Details */}
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col mx-10 gap-10 ">
        <h2 className="text-2xl font-bold bg-gradient-to-r mb-6 from-blue-600 to-purple bg-clip-text text-transparent">
          You May Also Like
        </h2>
        <PromotionsScrollable />
      </div>
    </div>
  );
}
