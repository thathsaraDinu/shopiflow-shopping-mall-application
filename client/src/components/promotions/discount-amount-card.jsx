import {
  MdDiscount,
  MdOutlineDateRange,
  MdOutlineShoppingBag,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

export function DiscountAmountCard({ promotion }) {
  const {
    storeName,
    discountAmount,
    startDate,
    endDate,
    description,
    photo,
    promoTitle,
  } = promotion;

  function truncateText(text, length) {
    return text.length > length
      ? text.substring(0, length) + <div>find more</div>
      : text;
  }

  return (
    <div className="flex flex-col border bg-white mb-3 gap-2 xl:w-[400px] w-[300px] min-w-[300px] xl:min-w-[400px] rounded-md">
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
            className="object-cover h-64 xl:h-72 w-full rounded-t-md" // Use 'object-cover' for cropping while maintaining aspect ratio
            src={
              photo
                ? photo
                : 'https://placehold.co/600x400/d3ffcc/000000?text=Promotion+Image'
            }
            alt="promotion"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between text-sm gap-2">
        <div className="flex justify-between text-sm text-gray-600 px-2">
          <div>
            <MdOutlineDateRange className="h-4 w-4 mr-2 inline-block" />
            <span>
              {new Date(startDate).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                },
              )}
            </span>
            <span className="mx-2">-</span>
            <span>
              {' '}
              {new Date(endDate).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                },
              )}
            </span>
          </div>
          <div>
            <div className="flex flex-col gap-1">
              {/*add discount icon and text*/}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MdDiscount className="h-4 w-4" />
                <span>{discountAmount} LKR off</span>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="card-header px-3 pb-2 flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg line-clamp-1 font-bold text-gray-800">
              {promoTitle}
            </h2>
            <div className="flex items-center gap-2">
              <MdOutlineShoppingBag className="h-4 w-4 inline-block" />
              <span className="text-base font-medium">
                {storeName}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end gap-1 text-sm text-gray-600">
            <div className="text-sm text-gray-600 line-clamp-2">
              {description}
            </div>
            <Link
              to={`/promotiondetails/${'type2'}/${promotion._id}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth', // Smooth scrolling effect
                });
              }}
            >
              <p className="text-sm hover:text-blue-700 text-blue-600 mr-1">
                Find out more
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiscountAmountCard;
