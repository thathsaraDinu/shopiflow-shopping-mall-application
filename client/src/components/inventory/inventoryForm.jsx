import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InventoryForm = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:shadow-none h-10 px-4 rounded-sm text-white text-sm hover:bg-blue-700 font-medium transition-all">
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-grey-800 text-xl font-medium">
              New Product
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <div className="flex">
              <Label
                htmlFor="picture"
                className="cursor-pointer"
              >
                <div className="w-[80px] h-[80px] border border-dashed border-grey-400 rounded-[10px] mr-5"></div>
              </Label>
              <div className="flex flex-col text-grey-400 text-sm text-center justify-center">
                <p>Drag image here</p>
                <p>or</p>
                <Label
                  htmlFor="picture"
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  Browse image
                  <Input
                    id="picture"
                    type="file"
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </div>
          <form className="mt-8" onSubmit={onSubmit}>
            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="productName"
                className="text-grey-700 font-medium"
              >
                Product Name
              </Label>
              <Input
                id="productName"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product name"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="productId"
                className="text-grey-700 font-medium"
              >
                Product ID
              </Label>
              <Input
                id="productId"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product ID"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="category"
                className="text-grey-700 font-medium"
              >
                Category
              </Label>
              <Input
                id="category"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product category"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="buyingPrice"
                className="text-grey-700 font-medium"
              >
                Buying Price
              </Label>
              <Input
                id="buyingPrice"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter buying price"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="quantity"
                className="text-grey-700 font-medium"
              >
                Quantity
              </Label>
              <Input
                id="quantity"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product quantity"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="unitPrice"
                className="text-grey-700 font-medium"
              >
                Unit Price
              </Label>
              <Input
                id="unitPrice"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product unit price"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <Label
                htmlFor="supplier"
                className="text-grey-700 font-medium"
              >
                Supplier
              </Label>
              <Input
                id="supplier"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter product supplier"
              />
            </div>

            <div className="flex items-center justify-between mb-8">
              <Label
                htmlFor="thresholdValue"
                className="text-grey-700 font-medium"
              >
                Threshold Value
              </Label>
              <Input
                id="thresholdValue"
                className="max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg"
                placeholder="Enter threshold value"
              />
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button className="bg-white hover:shadow-none h-10 px-4 mr-3 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all">
                  Discard
                </Button>
              </DialogClose>
              <Button className="bg-blue-500 hover:shadow-none h-10 px-4 rounded-sm text-white text-sm hover:bg-blue-700 font-medium transition-all">
                Add Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryForm;
