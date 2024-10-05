import { getPromotionById } from '@/api/promotion.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PromotionsScrollable } from '@/components/promotions/promotions-scrollable';

export default function PromotionDetails() {
  const { type, id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['promotions', id],
    queryFn: () => getPromotionById(id, type),
    enabled: true,
    onSuccess: (data) => {},
  });

  const promotiondetailscss =
    'flex flex-col lg:flex-row gap-5 justify-center xl:w-[800px] md:w-[600px] w-[300px] transition-all ease-in-out';

  return (
    <div className="mx-20 my-10 flex flex-col gap-16 items-center">
      <h1
        className="text-3xl font-medium text-center  text-gray-800 "
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        {data && data.data.promotion.promoTitle}
      </h1>
      <div className="flex gap-10">
        <div className="">
          {isLoading && (
            <p className="text-center h-[700px]">
              Loading...
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500">
              Error
            </p>
          )}
          {data && (
            <div className={promotiondetailscss}>
              {/* Image at the top */}
              <img
                src={data.data.promotion.photo}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="flex flex-col lg:gap-5 gap-3 justify-start lg:mt-5">
                {/* Date Range */}
                <div className="flex justify-start lg:w-[300px] text-sm text-gray-600">
                  <div>
                    {new Date(
                      data.data.promotion.startDate,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="mx-2">-</div>
                  <div>
                    {new Date(
                      data.data.promotion.endDate,
                    ).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
                        {data.data.promotion.discountAmount}{' '}
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
          )}
        </div>
      </div>
      <div className="flex flex-col mx-10 gap-10 ">
        <h1
          className="text-3xl font-medium text-center  text-gray-800"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          You May Also Like
        </h1>
        <PromotionsScrollable />
      </div>
    </div>
  );
}
