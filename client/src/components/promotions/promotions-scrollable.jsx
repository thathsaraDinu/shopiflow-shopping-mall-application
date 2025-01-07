import { UsePromotionsQuery } from '@/hooks/usePromotions';
import DiscountAmountCard from './discount-amount-card';
import { PromotionCard } from './promotion-card';
import { LoadingSpinner } from '../ui/spinner';

export function PromotionsScrollable() {
  const { discounts, amounts, isLoading } =
    UsePromotionsQuery();

  const scrollableContainer = document.getElementById(
    'scrollableContainer',
  );

  const allPromotions = [
    ...(discounts || []),
    ...(amounts || []),
  ];

  const handleSorting = (promotions) => {
    return [...promotions].sort(
      (a, b) =>
        new Date(a.startDate) - new Date(b.startDate),
    );
  };

  const allPromos = handleSorting(allPromotions);

  function scrollLeft() {
    const screenWidth = window.innerWidth;
    let scrollAmount;
    if (screenWidth >= 1280) {
      scrollAmount = 420;
    } else {
      scrollAmount = 340;
    }
    scrollableContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }

  function scrollRight() {
    const screenWidth = window.innerWidth;
    let scrollAmount;
    if (screenWidth >= 1280) {
      scrollAmount = 420;
    } else {
      scrollAmount = 340;
    }
    scrollableContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  return (
    <div className="w-full flex justify-center">
      {isLoading ? (
        <div className="col-span-5 h-96 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative max-w-[320px] md:max-w-[660px] xl:max-w-[1240px]">
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollLeft()}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-white p-2 hover:scale-125 transition-all ease-in-out duration-150 rounded-full z-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              color="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {/* Scrollable container */}

          <div
            id="scrollableContainer"
            className="flex justify-start gap-5 overflow-x-hidden overflow-y-hidden scrollbar-hide scroll-smooth"
          >
            {allPromos.map((promotion) => {
              if (promotion.promotionType == '1') {
                return (
                  <PromotionCard
                    key={promotion._id}
                    promotion={promotion}
                  />
                );
              } else {
                return (
                  <DiscountAmountCard
                    key={promotion._id}
                    promotion={promotion}
                  />
                );
              }
            })}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scrollRight()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-white p-2 hover:scale-125 transition-all ease-in-out duration-150 rounded-full z-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              color="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>{' '}
          </button>
        </div>
      )}
    </div>
  );
}
