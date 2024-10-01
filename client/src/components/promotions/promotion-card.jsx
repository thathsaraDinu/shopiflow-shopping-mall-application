export function PromotionCard({ promotion }) {
  const {
    storeName,
    description,
    startDate,
    endDate,
    isActive,
    photo,
  } = promotion;

  return (
    <div className="flex flex-col gap-2 min-w-80 w-[400px]   rounded-md ">
      <img
        className="object-cover h-60 w-full" // Use 'object-cover' for cropping while maintaining aspect ratio
        src={
          photo
            ? photo
            : 'https://placehold.co/600x400/d3ffcc/000000?text=Promotion+Image'
        }
        alt="promotion"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-lg font-medium">
            {storeName}
          </div>
          <div className="text-sm font-medium text-gray-500">
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {description}
        </div>
        <div className="flex justify-start text-sm text-gray-600">
          <div>
            {new Date(startDate).toLocaleDateString(
              'en-US',
              {
                month: 'short',
                day: 'numeric',
              },
            )}
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
      </div>
    </div>
  );
}
