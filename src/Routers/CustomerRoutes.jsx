import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
import Wishlist from "../customer/Components/WhishList/Wishlist";
import AllProductPage from "../Pages/AllProductPage";
import ShippingDeliveryPolicy from "../Pages/ShippementPolicy";
import TermsConditions from "../Pages/TermsConditions";
import CancellationReturnPolicy from "../Pages/Cancallection";
import ContactPage from "../Pages/ContactPage";
import UserProfile from "../Pages/UserProfile";
import BulkOrder from "../Pages/BulkOrder";
import AllJawellery from "../Pages/AllJawellery";
import PaymentUI from "../Pages/PaymentUI";
import MenShirt from "../Pages/MenShirt";
import MenKurte from "../Pages/MenKurte";
import Dcot from "../Pages/Dcot";
import Blouse from "../Pages/Blouse";
import ScrollToTop from "./ScrollToTop";
import ComingSoon from "../Pages/ComingSoon.jsx";
import AllproductSection from "../customer/Components/Product/Product/AllproductSection.jsx";
// import CabinRoomDetails from "../Pages/CabinRoomDetails";

const CustomerRoutes = () => {
  const location = useLocation();

  // Only show Navigation component when not on the NotFound page
  const showNavigation = location.pathname !== "*";

  // const path=["/","/home","/about","/privacy-policy","/terms-condition","/contact","/men",`/product/${productId}`]
  return (
    <div>
      <ThemeProvider theme={customerTheme}>
        <ScrollToTop />
        {showNavigation && <Navigation />}
        <div className="main-wrapper" style={{ marginTop: "75px" }}>
          <Routes>
            <Route path="/login" element={<Homepage />}></Route>
            <Route path="/register" element={<Homepage />}></Route>

            <Route path="/" element={<Homepage />}></Route>
            <Route path="/home" element={<Homepage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
            <Route
              path="/terms-condition"
              element={<TearmsCondition />}
            ></Route>

            <Route
              path="/:lavelOne/:lavelTwo/:lavelThree"
              element={<Product />}
            ></Route>

            <Route path="/all-jewellery" element={<AllJawellery />}></Route>
            <Route path="/all-men-shirts" element={<MenShirt />}></Route>
            <Route path="/all-men-kurte" element={<MenKurte />}></Route>
            <Route path="/dcot" element={<Dcot />}></Route>
            <Route path="/blouse" element={<Blouse />}></Route>
            {/* <Route
            path="/all-products"
            element={<ProductAll />}
          ></Route> */}
            <Route
              path="/product/:productId"
              element={<ProductDetails />}
            ></Route>
            <Route path="/productDetails" element={<ProductDetails />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/wish-item" element={<Wishlist />}></Route>
            <Route path="/account/order" element={<Order />}></Route>
            <Route path="/payment" element={<PaymentUI />}></Route>
            <Route
              path="/account/order/:orderId"
              element={<OrderDetails />}
            ></Route>
            <Route path="/contact-us" element={<ContactPage />}></Route>
            <Route path="/bulk-order" element={<BulkOrder />}></Route>
            <Route path="/Coming-soon" element={<ComingSoon/>}></Route>
            <Route
              path="/all-products_page"
              element={<AllProductPage />}
            ></Route>
            <Route
              path="/account/rate/:productId"
              element={<RateProduct />}
            ></Route>
            <Route path="/user-profile" element={<UserProfile />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route
              path="/payment/:orderId"
              element={<PaymentSuccess />}
            ></Route>
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
            <Route
              path="/ShippingDeliveryPolicy"
              element={<ShippingDeliveryPolicy />}
            ></Route>
            <Route path ='/all-product-section' element={<AllproductSection/>}></Route>
            <Route
              path="/TermsConditions"
              element={<TermsConditions />}
            ></Route>
            <Route
              path="/CancellationReturnPolicy"
              element={<CancellationReturnPolicy />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;
