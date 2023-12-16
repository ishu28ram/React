import { useState } from "react";

export const usePassword = () => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function generate(checkboxes, length) {
    let charSet = "";
    let generatedPassword = "";

    const selectChekBox = checkboxes.filter((checkbox) => checkbox.state);

    if (selectChekBox.length === 0) {
      setErrorMsg("select atleast one checkbox");
      setPassword("");
      return;
    }

    selectChekBox.forEach((option) => {
      switch (option.name) {
        case "include numbers ":
          charSet += "1234567890";
          break;
        case "include uppercase":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "include lowercase":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "include special char":
          charSet += "!@#$%^&*()-*/.";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[random];
    }
    setPassword(generatedPassword);
    setErrorMsg("");
  }

  return { password, errorMsg, generate };
};
