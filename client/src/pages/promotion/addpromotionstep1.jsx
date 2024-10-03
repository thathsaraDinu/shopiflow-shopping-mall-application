import { useState } from 'react';
import { CardTitle } from '@/components/ui/card';

export function AddPromotionStep1({ register, errors }) {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close

  // Toggle dropdown state
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="firstpart"
      className="transition-all duration-500 px-3 mb-6 mx-10 "
    >
      <div className="mt-5 mb-10 flex pt-5 items-center flex-col gap-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Select a Promotion Type
        </CardTitle>

        <div className="relative w-full">
          <select
            name="promotionType"
            className="block w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
            {...register('promotionType', {
              required: 'Promotion type is required',
            })}
            onClick={handleToggle} // Toggle icon when select is clicked
            onBlur={() => setIsOpen(false)} // Reset state when losing focus
          >
            <option value={0} disabled>
              Select type
            </option>
            <option value={1}>Discount Percentage</option>
            <option value={3}>Discount on Amount</option>
          </select>

          {/* Dropdown arrow with animation */}
          <div
            className={`absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#808080"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </div>
        </div>

        {errors.promotionType && (
          <div className="mt-2 text-sm text-red-500">
            {errors.promotionType.message}
          </div>
        )}
      </div>
    </div>
  );
}
