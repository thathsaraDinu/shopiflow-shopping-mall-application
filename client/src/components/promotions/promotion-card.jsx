import {
  MdDiscount,
  MdOutlineDateRange,
  MdOutlineShoppingBag,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

export function PromotionCard({ promotion }) {
  const {
    storeName,
    description,
    startDate,
    endDate,
    photo,
    discountPercentage,
    promoTitle,
  } = promotion;
  function truncateText(text, length) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
  }
  const cardcss =
    'flex flex-col mb-3 gap-2 xl:w-[400px] border bg-white w-[300px] min-w-[300px] xl:min-w-[400px] rounded-md';
  return (
    <div className={cardcss}>
      <Link
        to={`/promotiondetails/${'type1'}/${promotion._id}`}
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
      <div className='flex flex-col justify-between text-sm gap-2'>
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
                <span>{discountPercentage}% off</span>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="flex flex-col gap-1 px-3 pb-2">
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

          <div className="text-sm flex flex-col items-end justify-between gap-1 text-gray-600 line-clamp-3">
            <div className="text-sm text-gray-600 line-clamp-2">
              {description}
            </div>
            <Link
              to={`/promotiondetails/${'type1'}/${promotion._id}`}
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
