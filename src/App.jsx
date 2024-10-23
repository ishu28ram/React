import "./App.css";
import Navbar from "./component/header/Navbar";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Authentication from "./pages/Authentication";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContextAPI } from "./store/context";
import Loading from "./component/Loader/Loading";
import { useEffect, useState } from "react";
import Category from "./pages/Category";
import Review from "./component/rating/Review";

function App() {
  const { pathname } = useLocation();
  const hideElement = pathname !== "/auth";
  const { userData, showReviewModal, setShowReviewModal } = useContextAPI();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.uid !== null) {
      setLoading(false);
    }
  }, [userData]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      {hideElement && <Navbar />}
      <main className="mt-[8rem] mx-[2rem] md:mx-[5rem]">
        <Routes>
          <Route path="/" element={userData ? <Home /> : <Authentication />} />
          <Route path="/:productName/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search/:prodName" element={<Search />} />
          <Route path="/cat/:catName" element={<Category />} />
          <Route
            path="/payment"
            element={userData ? <Payment /> : <Navigate to="/auth" />}
          />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
