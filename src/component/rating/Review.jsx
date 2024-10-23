import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { PiCameraPlusFill } from "react-icons/pi";
import { useContextAPI } from "../../store/context";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Upload from "../../firebase/upload";

const Review = ({ product }) => {
  const { userData, setShowReviewModal } = useContextAPI();
  const [loading, setLoading] = useState(false);
  const [reviewImg, setReviewImg] = useState([]);
  const [inputs, setInputs] = useState({
    description: "",
    title: "",
    ratings: 0,
  });

  const handleRatingChange = (newRating) => {
    setInputs((prev) => ({
      ...prev,
      ratings: newRating,
    }));
  };

  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleReviewImage = (e) => {
    const files = Array.from(e.target.files);
    const imageObjects = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setReviewImg((prev) => [...prev, ...imageObjects]);
  };

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (inputs.description === "") {
      alert("description cannot be empty");
      return;
    }
    const productIdString = String(product.id);
    const reviewRef = doc(db, "reviews", productIdString);
    let uploadedImageUrls = [];
    try {
      const filesToUpload = reviewImg.map((imgObj) => imgObj.file);
      uploadedImageUrls = await Upload(filesToUpload);
    } catch (uploadError) {
      console.error("Error uploading images:", uploadError);
    }
    const reviewData = {
      userId: userData?.uid,
      productId: product.id,
      reviewTitle: inputs.title,
      reviewDescription: inputs.description,
      rating: inputs.ratings,
      userName: userData?.username,
      userProfile: userData?.profilePicURL || "",
      reviewImages: uploadedImageUrls,
      isLiked: false,
      reviewTimeStamp: new Date(),
    };
    try {
      setLoading(true);
      const reviewDoc = await getDoc(reviewRef);
      if (reviewDoc.exists()) {
        await updateDoc(reviewRef, {
          reviews: arrayUnion(reviewData),
        });
        console.log(reviewDoc.data().reviews);
      } else {
        await setDoc(reviewRef, {
          reviews: [reviewData],
        });
      }

      setInputs({
        description: "",
        title: "",
        ratings: 0,
      });
      setReviewImg([]);
      setShowReviewModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      reviewImg.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, [reviewImg]);
  return (
    <div className="relative flex flex-col gap-[2rem]">
      {/* Rate */}
      <Rating
        totalStars={5}
        value={inputs.ratings}
        onRatingChange={handleRatingChange}
      />

      {/* Review */}
      <div className="flex flex-col gap-[20px]">
        <h1 className="text-2xl font-semibold">Review this product</h1>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-6">
          <div className="form-fields flex flex-col gap-[5px] ">
            <label htmlFor="title" className="font-semibold text-lg">
              Title
            </label>
            <textarea
              value={inputs.title}
              name="title"
              id="title"
              onChange={handleInputs}
              className="h-[60px]  outline-none resize-none overflow-y-auto p-[10px] rounded-md border-[2px] border-gray-300"
            ></textarea>
          </div>
          <div className="form-fields flex flex-col  gap-[5px] ">
            <label htmlFor="description" className="font-semibold text-lg">
              Description
            </label>
            <textarea
              value={inputs.description}
              name="description"
              id="description"
              onChange={handleInputs}
              className="h-[160px] outline-none resize-none overflow-y-auto p-[10px] rounded-md border-[2px] border-gray-300"
            ></textarea>
          </div>
          {/* Add review image */}
          <div className="flex gap-[50px]">
            <label
              htmlFor="reviewimg"
              className="bg-gray-300  flex p-[20px] justify-center items-center w-[80px] rounded-md cursor-pointer"
            >
              <span className="text-gray-500 text-3xl">
                <PiCameraPlusFill />
              </span>
              <input
                type="file"
                name="reviewimg"
                id="reviewimg"
                className="hidden"
                onChange={handleReviewImage}
              />
            </label>
            {reviewImg && reviewImg.length > 0 && (
              <div className="flex gap-2 ">
                {reviewImg?.map((img, i) => (
                  <img
                    key={img.previewUrl}
                    src={img.previewUrl}
                    alt={`Preview ${i + 1}`}
                    className="h-20 w-20 object-cover rounded-md border-2 border-gray-500"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rounded-lg px-6 py-2 text-lg font-bold bg-customGreenBtn hover:bg-customGreenHoverBtn self-end"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
