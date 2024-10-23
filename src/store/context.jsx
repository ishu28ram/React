import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Context = createContext();

export const Contextprovider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  async function fetchUserData(uid) {
    if (!uid) {
      return;
    }
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        fetchUserData(null);
        setUserData(null);
      }
    });
    return () => {
      unSub();
    };
  }, []);

  const values = {
    userData,
    setUserData,
    fetchUserData,
    isOpen,
    setIsOpen,
    showReviewModal,
    setShowReviewModal,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useContextAPI = () => {
  return useContext(Context);
};
