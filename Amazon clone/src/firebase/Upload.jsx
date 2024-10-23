import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const Upload = async (files) => {
  const filesArray = Array.isArray(files) ? files : [files];

  const uploadPromises = filesArray.map((file) => {
    const date = new Date();
    const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`); // Use timestamp for uniqueness

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error(error.message);
          reject("Something went wrong: " + error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  });

  return Promise.all(uploadPromises);
};

export default Upload;
