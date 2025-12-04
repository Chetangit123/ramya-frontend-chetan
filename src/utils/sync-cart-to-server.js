import { toast } from "react-toastify";
import { addItemToCart } from "../Redux/Customers/Cart/Action";

const syncGuestCartToServer = async (jwt, dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  if (!guestCart.length) return;

  try {
    for (let item of guestCart) {
      const data = {
        productId: item._id,
        size: item.size,
        quantity: item.quantity,
      };
      await dispatch(addItemToCart({ data, jwt }));
    }
    // ✅ Clear guest cart after sync
    localStorage.removeItem("guestCart");
    toast.success("Your cart was synced with your account!");
  } catch (error) {
    console.error("Cart sync failed:", error);
    toast.error("Failed to sync guest cart with your account");
  }
};

export default syncGuestCartToServer
