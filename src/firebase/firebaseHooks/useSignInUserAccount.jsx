import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const useSignInUserAccount = () => {
  const navigate = useNavigate();
  async function login(email, password) {
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);

      if (userInfo) {
        alert("login successfully");
        navigate("/");
      } else {
        alert("user not found");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return { login };
};

export default useSignInUserAccount;
