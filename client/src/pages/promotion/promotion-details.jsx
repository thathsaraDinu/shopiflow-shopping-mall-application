import { getPromotionById } from '@/api/promotion.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function PromotionDetails() {
  const { type, id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['promotions', id],
    queryFn: () => getPromotionById(id, type),
    enabled: true,
    onSuccess: (data) => {
      console.log('Query successful, data:', data);
    },
  });

  return (
    <div className="mx-20 my-10 flex flex-col gap-20 justify-center items-center">
      <h1 className="text-2xl font-bold text-center  text-gray-800">
        Promotion Details
      </h1>
      {type == 'type1' ? (
        <>
          <div className="pb-10">
            {isLoading && (
              <p className="text-center">Loading...</p>
            )}
            {isError && (
              <p className="text-center text-red-500">
                Error
              </p>
            )}
            {data && (
              <div className="space-y-4 ">
                {/* Image at the top */}
                <img
                  src={data.data.promotion.photo}
                  alt={data.data.promotion.storeName}
                  className="w-[600px] h-[400px] object-cover rounded-lg"
                />
                <div className="flex justify-start text-sm text-gray-600">
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
                <div className="space-y-2 mx-5">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {data.data.promotion.storeName}
                    </h2>
                    <span className="text-gray-700">
                      Discounts Upto{' '}
                      {
                        data.data.promotion
                          .discountPercentage
                      }
                      %
                    </span>
                  </div>
                </div>
                {/* Description */}
                <p className="text-gray-600 mx-5">
                  {data.data.promotion.description}
                </p>

                {/* Other Promotion Details */}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="pb-10">
            {isLoading && (
              <p className="text-center">Loading...</p>
            )}
            {isError && (
              <p className="text-center text-red-500">
                Error
              </p>
            )}
            {data && (
              <div className="space-y-4 ">
                {/* Image at the top */}
                <img
                  src={data.data.promotion.photo}
                  alt={data.data.promotion.storeName}
                  className="w-[600px] h-[400px] object-cover rounded-lg"
                />
                <div className="flex justify-start text-sm text-gray-600">
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
                <div className="space-y-2 flex flex-col gap-5">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {data.data.promotion.storeName}
                    </h2>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700  mx-5">
                      Discounts Upto{' '}
                      <span className="text-black font-bold">
                        {data.data.promotion.discountAmount}{' '}
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
                  </div>
                  <p className="text-gray-600 mx-5">
                    {data.data.promotion.description}
                  </p>
                </div>
                {/* Description */}

                {/* Other Promotion Details */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
