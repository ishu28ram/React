import React, { useEffect, useState } from "react";
import { useContextAPI } from "../../lib/store/context/context";

const Toast = () => {
  const [loader, setLoader] = useState(100);
  const {
    dispatchFavourites,
    stateFavourites: {
      showToast: { isShown, text },
    },
  } = useContextAPI();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (loader <= 0) {
        dispatchFavourites({ type: "REMOVE_TOAST" });
      }
      setLoader((prev) => prev - 1);
    }, 20);

    return () => clearTimeout(timeOut);
  }, [loader, isShown]);
  return (
    <div className="toast_container">
      <p>
        {text}
        <button
          onClick={() =>
            dispatchFavourites({
              type: "REMOVE_TOAST",
            })
          }
        >
          X
        </button>
      </p>
      <div className="loader" style={{ width: `${loader}%` }}></div>
    </div>
  );
};

export default Toast;
