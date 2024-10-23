import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import Upload from "../upload";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useCreateUserAccount = () => {
  const navigate = useNavigate();
  async function register(username, profileImg, email, password) {
    try {
      let profilePicURL = profileImg.file
        ? await Upload(profileImg.file)
        : null;
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: email,
          username: username,
          phonenumber: "",
          address: "",
          wish: [],
          cart: [],
          orders: [],
          total: 0,
          createdAt: Date.now(),
          profilePicURL: profilePicURL,
        };
        alert("user created");
        await setDoc(doc(db, "users", newUser.user.uid), userDoc);
        navigate("/");
        // localStorage.setItem("user-info", JSON.stringify(userDoc));
      } else {
        alert("user not created");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return { register };
};

export default useCreateUserAccount;
