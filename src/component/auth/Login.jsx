import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useSignInUserAccount from "../../firebase/firebaseHooks/useSignInUserAccount";

const Login = ({ setIsLogin }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useSignInUserAccount();

  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmitInputs(e) {
    e.preventDefault();
    const { email, password } = inputs;
    if (email !== "" && password !== "") {
      login(email, password);
    }
  }

  return (
    <div className="flex items-center flex-col gap-6 mt-[-80px]">
      <h1 className="text-3xl font-extrabold">ZapCart</h1>
      <form
        className="border-[1px] flex flex-col gap-4 px-4 py-6 border-slate-300 rounded-lg min-w-[350px]"
        onSubmit={handleSubmitInputs}
      >
        <h1 className="text-2xl font-semibold mb-3">Log in</h1>
        <div>
          <label htmlFor="profileImg">
            <img src="" alt="" />
          </label>
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            className="hidden"
          />
        </div>
        <div className="form-field  flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className="border-[1px] px-2 py-2 rounded-lg border-gray-300  outline-none"
            required
            value={inputs.email}
            onChange={handleInputs}
          />
          <span></span>
        </div>
        <div className=" form-field  flex flex-col gap-2">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <div className="relative rounded-lg border-gray-300 border-[1px] px-2 py-2">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              name="password"
              placeholder="At least 6 characters"
              className=" w-[90%] border-none outline-none "
              required
              value={inputs.password}
              onChange={handleInputs}
            />
            <span
              className="absolute top-3 right-4 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <span></span>
        </div>
        <button
          type="submit"
          className="bg-customGreenBtn hover:bg-customGreenHoverBtn p-2 rounded-lg font-semibold"
        >
          Log in
        </button>
        <p className="text-center text-sm font-medium">
          don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(false)}
          >
            register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
