import { useNavigation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function PromotionCard({ promotion }) {
  const {
    storeName, 
    description,
    startDate,
    endDate,
    photo,
  } = promotion;
  function truncateText(text, length) {
    return text.length > length
      ? text.substring(0, length) + '...'
      : text;
  }
  const cardcss =
    'flex flex-col mb-3 gap-2 xl:w-[400px] w-[320px] min-w-[320px] xl:min-w-[400px] rounded-md';
  const navigation = useNavigation();
  return (
    <div className={cardcss}>
      <Link
        to={`/promotiondetails/${'type1'}/${promotion._id}`}
        onClick={()=> {
           window.scrollTo({
             top: 0,
             behavior: 'smooth', // Smooth scrolling effect
           });
        }}
      >
        <img
          className="object-cover h-64 xl:h-72 w-full" // Use 'object-cover' for cropping while maintaining aspect ratio
          src={
            photo
              ? photo
              : 'https://placehold.co/600x400/d3ffcc/000000?text=Promotion+Image'
          }
          alt="promotion"
        />
      </Link>
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
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="text-lg font-medium">
            {storeName}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {truncateText(description, 80)}
        </div>
      </div>
    </div>
  );
}
