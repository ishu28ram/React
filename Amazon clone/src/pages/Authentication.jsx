import React, { useState } from "react";
import Register from "../component/auth/Register";
import Login from "../component/auth/Login";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Authentication;
