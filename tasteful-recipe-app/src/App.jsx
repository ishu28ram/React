import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
// import { useContextAPI } from "./lib/store/context/context";
// import Toast from "./component/Toast/Toast";

function App() {
  // const {
  //   stateFavourites: {
  //     showToast: { isShown },
  //   },
  // } = useContextAPI();

  // const location = useLocation();
  // const hideElement = location.pathname !== "/";

  // useEffect(() => {
  //   if (location.pathname) {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // }, [location.pathname]);
  return (
    <main>
      {/* header navbar */}
      <Navbar />
      <div className="seperator"></div>
      {/* {isShown && <Toast />} */}

      <div className="main_container">
        {/* <BGIcons /> */}
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
