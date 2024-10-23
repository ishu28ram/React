import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";

const ReviewSummary = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getReviews() {
      try {
        const reviewRef = doc(db, "reviews", id);
        const reviewSnap = await getDoc(reviewRef);
        if (reviewSnap.exists()) {
          const reviewsData = reviewSnap.data().reviews || [];
          setReviews(reviewsData);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getReviews();
  }, [id]);

  const totalRatings = reviews.length;
  const ratingCount = Array(5).fill(0);

  reviews.forEach((review) => {
    const { rating } = review;
    if (rating >= 1 && rating <= 5) {
      ratingCount[rating - 1] += 1;
    }
  });

  const overallRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
  ).toFixed(2);

  const ratingPercentages = ratingCount.map(
    (count) => ((count / totalRatings) * 100).toFixed(2) + "%"
  );

  return (
    <div>
      <h2>Overall Rating: {overallRating} Stars</h2>
      <h3>Rating Distribution:</h3>
      <ul>
        {ratingCount.map((count, index) => (
          <li key={index}>
            {index + 1} Star: {count} ({ratingPercentages[index]})
            <div
              style={{
                backgroundColor: "lightgray",
                height: "20px",
                width: `${ratingPercentages[index]}`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ReviewSummary;
