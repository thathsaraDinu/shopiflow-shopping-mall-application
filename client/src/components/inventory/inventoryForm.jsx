import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productValidation } from '@/validations/product-validation';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createProduct } from '@/api/product.api';
import { useMutation } from '@tanstack/react-query';

const InventoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productValidation),
    reValidateMode: 'onBlur',
  });
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const addProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: async (data) => {
      toast.success('Product added successfully');
      setOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error('Something went wrong');
    },
  });

  const onSubmit = async (data) => {
    addProduct.mutate(data);
  };

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={setOpen}>
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
            <DialogDescription className="sr-only">
              Enter product details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center">
              <div className="flex">
                <Label
                  htmlFor="image"
                  className="cursor-pointer"
                >
                  <div className="w-[80px] h-[80px] border border-dashed border-grey-400 rounded-[10px] mr-5 overflow-hidden">
                    {image && (
                      <img
                        className="w-[80px] h-[80px]"
                        src={image}
                        alt="image"
                      />
                    )}
                  </div>
                </Label>
                <div className="flex flex-col text-grey-400 text-sm text-center justify-center">
                  <p>Drag image here</p>
                  <p>or</p>
                  <Label
                    htmlFor="image"
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Browse image
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </Label>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="productName"
                  className="text-grey-700 font-medium"
                >
                  Product Name
                </Label>
                <Input
                  id="productName"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.name && 'ring-1 ring-red'}`}
                  placeholder="Enter product name"
                  {...register('name')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.name && (
                    <p className="text-[12px] text-red">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="productId"
                  className="text-grey-700 font-medium"
                >
                  Product ID
                </Label>
                <Input
                  id="productId"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.productID && 'ring-1 ring-red'}`}
                  placeholder="Enter product ID"
                  {...register('productID')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.productID && (
                    <p className="text-[12px] text-red">
                      {errors.productID.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="category"
                  className="text-grey-700 font-medium"
                >
                  Category
                </Label>
                <Input
                  id="category"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.category && 'ring-1 ring-red'}`}
                  placeholder="Enter product category"
                  {...register('category')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.category && (
                    <p className="text-[12px] text-red">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="buyingPrice"
                  className="text-grey-700 font-medium"
                >
                  Buying Price
                </Label>
                <Input
                  id="buyingPrice"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.buyingPrice && 'ring-1 ring-red'}`}
                  placeholder="Enter buying price"
                  {...register('buyingPrice')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.buyingPrice && (
                    <p className="text-[12px] text-red">
                      {errors.buyingPrice.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="quantity"
                  className="text-grey-700 font-medium"
                >
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.quantity && 'ring-1 ring-red'}`}
                  placeholder="Enter product quantity"
                  {...register('quantity')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.quantity && (
                    <p className="text-[12px] text-red">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="unitPrice"
                  className="text-grey-700 font-medium"
                >
                  Unit Price
                </Label>
                <Input
                  id="unitPrice"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.unitPrice && 'ring-1 ring-red'}`}
                  placeholder="Enter product unit price"
                  {...register('unitPrice')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.unitPrice && (
                    <p className="text-[12px] text-red">
                      {errors.unitPrice.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 relative">
                <Label
                  htmlFor="supplier"
                  className="text-grey-700 font-medium"
                >
                  Supplier
                </Label>
                <Input
                  id="supplier"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.supplier && 'ring-1 ring-red'}`}
                  placeholder="Enter product supplier"
                  {...register('supplier')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.supplier && (
                    <p className="text-[12px] text-red">
                      {errors.supplier.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mb-8 relative">
                <Label
                  htmlFor="thresholdValue"
                  className="text-grey-700 font-medium"
                >
                  Threshold Value
                </Label>
                <Input
                  id="thresholdValue"
                  className={`max-w-[270px] text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500 rounded-lg ${errors.thresholdValue && 'ring-1 ring-red'}`}
                  placeholder="Enter threshold value"
                  {...register('thresholdValue')}
                />
                <div className="absolute left-[140px] bottom-[-20px]">
                  {errors.thresholdValue && (
                    <p className="text-[12px] text-red">
                      {errors.thresholdValue.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button
                    onClick={() => reset()}
                    className="bg-white hover:shadow-none h-10 px-4 mr-3 border border-grey-100 rounded-sm text-grey-600 hover:bg-white text-sm font-medium transition-all"
                  >
                    Discard
                  </Button>
                </DialogClose>
                <Button className="bg-blue-500 hover:shadow-none h-10 px-4 rounded-sm text-white text-sm hover:bg-blue-700 font-medium transition-all">
                  Add Product
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryForm;
