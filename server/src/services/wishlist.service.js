import Wishlist from '../models/wishlist.model.js';
import Product from '../models/product.model.js';

const wishlistService = {
  getWishlistWithProductDetails: async (userId) => {
    try {
      const wishlist = await Wishlist.findOne({ user: userId })
        .populate({
          path: 'products',
          select: 'name image buyingPrice category'
        })
        .exec();

      if (!wishlist) {
        return { message: 'Wishlist not found for this user.' };
      }

      return wishlist;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  addToWishlist: async (productId, userId) => {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId]
      });
    } else {
      if (wishlist.products.includes(productId)) {
        return { message: 'Product is already in the wishlist' };
      }

      wishlist.products.push(productId);
    }

    await wishlist.save();

    return wishlist;
  },

  removeFromWishlist: async (productId, userId) => {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return { message: 'Wishlist not found for this user.' };
    }

    if (!wishlist.products.includes(productId)) {
      return { message: 'Product is not in the wishlist' };
    }

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId.toString());

    await wishlist.save();

    return wishlist;
  }
};

export default wishlistService;
