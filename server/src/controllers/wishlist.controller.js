import wishlistService from '../services/wishlist.service.js';

const WishlistController = {
  getWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const wishlist = await wishlistService.getWishlistWithProductDetails(userId);

      res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  addToWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      const wishlist = await wishlistService.addToWishlist(productId, userId);

      res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  removeFromWishlist: async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.id;

      const wishlist = await wishlistService.removeFromWishlist(productId, userId);

      res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default WishlistController;
