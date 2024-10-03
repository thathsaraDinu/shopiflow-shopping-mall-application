import { getPromotionById } from '@/api/promotion.api';
import DiscountAmountCard from '@/components/promotions/discount-amount-card';
import { MapPromotions } from '@/hooks/map-promotions';
import { PromotionCard } from '@/components/promotions/promotion-card';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function PromotionDetails() {
  const { type, id } = useParams();
  const { discounts, amounts } = MapPromotions();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['promotions', id],
    queryFn: () => getPromotionById(id, type),
    enabled: true,
    onSuccess: (data) => {
      console.log('Query successful, data:', data);
    },
  });

  const promotiondetailscss =
    'flex flex-col lg:flex-row gap-5 justify-center xl:w-[800px] md:w-[600px] h- w-[350px] transition-all ease-in-out';

  return (
    <div className="mx-20 my-10 flex flex-col gap-16 items-center">
      <h1 className="text-2xl font-bold text-center  text-gray-800 h-">
        Promotion Details
      </h1>
      <div className="flex gap-10">
        {type == 'type1' ? (
          <>
            <div className="">
              {isLoading && (
                <p className="text-center">Loading...</p>
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
                    alt={data.data.promotion.storeName}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-5 justify-start lg:mt-5 ">
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
                        {' '}
                        {new Date(
                          data.data.promotion.endDate,
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <hr></hr>

                    {/* Store name */}
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {data.data.promotion.storeName}
                        </h2>
                      </div>
                      <span className="text-gray-700">
                        <span className="hidden md:inline-block">
                          Discounts
                        </span>{' '}
                        <span>
                          Upto{' '}
                          {
                            data.data.promotion
                              .discountPercentage
                          }
                        </span>
                        %
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600">
                      {data.data.promotion.description}
                    </p>
                  </div>

                  {/* Other Promotion Details */}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="">
              {isLoading && (
                <p className="text-center">Loading...</p>
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
                    alt={data.data.promotion.storeName}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-5 justify-start lg:mt-5">
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
                        {' '}
                        {new Date(
                          data.data.promotion.endDate,
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <hr></hr>
                    <div className="flex flex-col gap-2 ">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {data.data.promotion.storeName}
                        </h2>
                      </div>
                      <div className="flex flex-col gap-2 justify-between">
                        <span className="text-gray-700">
                          Discounts Upto{' '}
                          <span className="text-black font-bold">
                            {
                              data.data.promotion
                                .discountAmount
                            }{' '}
                            /=
                          </span>{' '}
                          on{' '}
                          <span className="text-black font-bold">
                            {' '}
                            {
                              data.data.promotion
                                .qualifyingPurchaseAmount
                            }
                            /=
                          </span>{' '}
                          worth of purchase
                        </span>
                        <p className="text-gray-600 ">
                          {data.data.promotion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Store name */}

                  {/* Description */}

                  {/* Other Promotion Details */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mx-10 gap-10 ">
        <h1 className="text-2xl font-bold text-center  text-gray-800">
          You May Also Like
        </h1>
        <div className="flex justify-start gap-5 max-w-[300px] xl:max-w-screen-xl md:max-w-screen-md h-[400px] overflow-x-scroll overflow-y-hidden ">
          {discounts?.map((promotion) => (
            <PromotionCard
              key={promotion._id}
              promotion={promotion}
            />
          ))}
          {amounts?.map((promotion) => (
            <DiscountAmountCard
              key={promotion._id}
              promotion={promotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
