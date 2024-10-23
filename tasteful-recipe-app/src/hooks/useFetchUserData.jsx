import React, { useEffect, useState } from "react";

const useFetchUserData = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://dummyjson.com/users?limit=10`);
      if (!response) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setUserData(data.users);
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return {
    userData,
    error,
    isLoading,
  };
};

export default useFetchUserData;
