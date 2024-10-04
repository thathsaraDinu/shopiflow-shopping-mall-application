import { removeFromWishlist } from '@/api/wishlist.api';
import useWishlist from '@/hooks/useWishlist';

const Wishlist = () => {
  const { data, refetch } = useWishlist();

  const removeItemFromWishlist = async (productId) => {
    try {
      const response = await removeFromWishlist(productId);

      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="font-bold text-2xl my-5">
        My Wishlist
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Product</th>
            <th>Shop</th>
            <th>Price</th>
            <th className="text-center">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.products?.map((item) => (
              <tr key={item.name}>
                <td className="flex items-center pt-5">
                  <img
                    className="w-10 h-10 mr-5"
                    src={item.image}
                    alt={item.name}
                  />
                  {item.name}
                </td>
                <td className="pt-5">{item.supplier}</td>
                <td className="pt-5">
                  ${item.buyingPrice.toFixed(2)}
                </td>
                <td className="text-center pt-5">
                  <button
                    onClick={() =>
                      removeItemFromWishlist(item._id)
                    }
                    className="mt-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red"
                    >
                      <path
                        d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 6V3H15V6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 6H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 10V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 10V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
