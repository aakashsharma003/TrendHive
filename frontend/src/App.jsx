import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ThankYou from "./pages/ThankYou";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Landing />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/product/:id" element={<SingleProduct />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about-us" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="user-profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
