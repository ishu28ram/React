import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import avator from "../../asset/avator.png";
import useCreateUserAccount from "../../firebase/firebaseHooks/useCreateUserAccount";

const Register = ({ setIsLogin }) => {
  const [profileImg, setProfileImg] = useState({
    url: "",
    file: null,
  });
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useCreateUserAccount();

  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleAvatorProfile(e) {
    if (e.target.files[0]) {
      setProfileImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  function handleSubmitInputs(e) {
    e.preventDefault();
    const { email, username, password } = inputs;
    if (email !== "" || password !== "" || username !== "") {
      register(username, profileImg, email, password);
    }
  }

  return (
    <div className="flex items-center flex-col gap-6 mt-[-80px]">
      <h1 className="text-3xl font-extrabold">ZapCart</h1>
      <form
        className="border-[1px] flex flex-col gap-4 px-4 py-6 border-slate-300 rounded-lg min-w-[350px] "
        onSubmit={handleSubmitInputs}
      >
        <h1 className="text-2xl font-semibold mb-3">Sign Up</h1>
        <div>
          <label htmlFor="profileImg" className="flex gap-2 items-center">
            <img
              src={profileImg.url || avator}
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-full border-[1px] border-slate-400"
            />
            <span className="hover:underline cursor-pointer">
              choose your profile
            </span>
          </label>
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            className="hidden"
            onChange={handleAvatorProfile}
          />
        </div>
        <div className="form-field flex flex-col gap-2 ">
          <label htmlFor="username" className="font-bold">
            Your name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="first and last name"
            className="border-[1px] px-2 py-2 rounded-lg border-gray-300 outline-none"
            required
            value={inputs.username}
            onChange={handleInputs}
          />
          <span></span>
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
          Register
        </button>
        <p className="text-center text-sm font-medium">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
