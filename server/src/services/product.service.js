import Product from '../models/product.model.js';

const productService = {
  createProduct: async (productData) => {
    const product = new Product(productData);
    await product.save();

    return product;
  },

  getAllProducts: async () => {
    const products = await Product.find();

    return products;
  },

  getProductById: async ({ id }) => {
    const product = await Product.findOne({ productID: id });

    return product;
  }
};

export default productService;
