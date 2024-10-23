import React, { useEffect, useState } from "react";
import "./BannerHome.css";
import { foods_quotes } from "../../../lib/data/data";

function BannerHome() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setQuoteIndex((prev) => {
        if (prev === foods_quotes.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  }, [quoteIndex]);

  return (
    <div className="banner_container container">
      <div className="left">
        <div className="quote_container">
          <h3>{foods_quotes[quoteIndex].quote}</h3>
          <p>{foods_quotes[quoteIndex].author}</p>
        </div>
      </div>
      <div className="right">
        <img src={foods_quotes[quoteIndex].img} alt="" />
      </div>
    </div>
  );
}

export default BannerHome;
