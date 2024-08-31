import { CardTitle } from '@/components/ui/card';

export function AddPromotionStep1({ register, errors }) {
  return (
    <div
      id="firstpart"
      className="transition-all duration-500 px-3 mb-6 sm:px-10"
    >
      <div className="mt-5 mb-10 flex pt-5 items-center flex-col gap-2">
        <CardTitle>Select a Promotion type</CardTitle>
        <div className="h-6"></div>

        <select
          name="promotionType"
          className="my-2 px-4 py-3 rounded-lg border border-gray-300"
          {...register('promotionType', {
            required: 'Promotion type is required',
          })}
        >
          <option className="px-4 py-3" value={0}>
            Select type
          </option>
          <option value={1} className="p-10">
            Discount Percentage
          </option>

          <option value={3}>Discount on Amount</option>
        </select>
        <div className='text-sm text-red-500'>
          {errors.promotionType && (
            <p>{errors.promotionType.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
