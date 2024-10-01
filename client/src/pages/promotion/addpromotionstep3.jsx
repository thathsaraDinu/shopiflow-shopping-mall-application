import InputField from "@/components/form-field";
import { CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function AddPromotionStep3({
  promotionType,
  register,
  errors,
  handleFileChange
}) {
  const [startDate, setStartDate] = useState("");
  const [photo, setPhoto] = useState(null);
  return (
    <div className="transition-all duration-500">
      <CardTitle className="text-center pb-10">
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
      </CardTitle>
      <div className="flex justify-between">
        <div className="pb-4 inline-block">
          <InputField
            type="date"
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            
            label={'Start Date'}
            errors={errors}
            register={register}
          />
        </div>

        <div className="pb-4 inline-block">
          <InputField
            disabled={startDate == '' ? true : false}
            type="date"
            name="endDate"
            min={startDate}
            
            label={'End Date'}
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <div>
        <label className=" text-sm text-black font-medium">
          Photo
        </label>
        <br />

        <input
          type="file"
          name="photo"
          className="hidden"
          label={'Photo'}
          id="file-upload"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
            handleFileChange(e);
          }}
        />
        <div className="pt-3">
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
          >
            Upload Photo
          </label>
        </div>
        <div className="flex items-center">
          <div className=" pt-4 inline-block">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="promotion"
                className=" h-40"
              />
            ) : (
              <img
                src="https://placehold.co/600x400/d3ffcc/000000?text=No+Image+Selected
"
                alt="promotion"
                className="h-40 w-60"
              />
            )}
          </div>
          <div
            onClick={() => setPhoto(null)}
            className=" ml-10 py-1 px-3  border-red border-2 rounded-md inline-block cursor-pointer text-sm text-red"
          >
            Clear
          </div>
        </div>
      </div>
    </div>
  );
}
