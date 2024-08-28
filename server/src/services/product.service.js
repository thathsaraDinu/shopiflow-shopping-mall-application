import Product from '../models/product.model.js';

const productService = {
  createProduct: async (productData) => {
    const product = new Product(productData);
    await product.save();

    return product;
  }
};

export default productService;
