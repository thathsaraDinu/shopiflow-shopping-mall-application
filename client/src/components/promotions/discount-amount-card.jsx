import { Link } from 'react-router-dom';

export function DiscountAmountCard({ promotion }) {
  const {
    storeName,
    discountAmount,
    qualifyingPurchaseAmount,
    description,
    isActive,
    startDate,
    endDate,
    photo,
  } = promotion;

  function truncateText(text, length) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
  }

  return (
    <div className="flex flex-col mb-3 gap-2 xl:w-[350px] w-[300px] min-w-[300px] rounded-md">
      <div>
        <Link
          to={`/promotiondetails/${'type2'}/${promotion._id}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth', // Smooth scrolling effect
            });
          }}
        >
          <img
            className="object-cover h-60 w-full" // Use 'object-cover' for cropping while maintaining aspect ratio
            src={
              photo
                ? photo
                : 'https://placehold.co/600x400/d3ffcc/000000?text=Promotion+Image'
            }
            alt="promotion"
          />
        </Link>
      </div>
      <div className="flex justify-start text-sm text-gray-600">
        <div>
          {new Date(startDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="mx-2">-</div>
        <div>
          {' '}
          {new Date(endDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
      <hr></hr>
      <div className="card-header flex flex-col gap-1">
        <div className="text-lg font-medium">
          {truncateText(storeName, 30)}
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">
            Upto {discountAmount}/= Discounts{' '}
          </p>

          <p className="text-sm">Find out more</p>
        </div>
      </div>
    </div>
  );
}
export default DiscountAmountCard;
