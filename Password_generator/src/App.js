import { useState } from "react";
import "./App.css";
import { usePassword } from "./hooks/use-generate-password";
import Checkboxes from "./components/Checkboxes";
import StrongChecker from "./components/StrongChecker";

const dataArray = [
  { id: 1, name: "include numbers ", state: false },
  { id: 2, name: "include uppercase", state: false },
  { id: 3, name: "include lowercase", state: false },
  { id: 4, name: "include special char", state: false },
];

function App() {
  const [length, setLength] = useState(4);
  const [checkboxes, setCheckboxes] = useState(dataArray);
  const [copy, setCopy] = useState(false);

  function handleCheckbox(i) {
    const selectcheckbox = [...checkboxes];
    selectcheckbox[i].state = !selectcheckbox[i].state;
    console.log(selectcheckbox);
    setCheckboxes(selectcheckbox);
  }
  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  const { password, errorMsg, generate } = usePassword();

  return (
    <div className="app">
      <div className="main-container">
        {/* password  */}
        {password && (
          <div className="password-container">
            <span>{password}</span>
            <button onClick={handleCopy}>{copy ? "copied" : "copy"}</button>
          </div>
        )}
        {/* char length */} {/* char range selector */}
        <div className="char-length-container">
          <div className="char-length">
            <span>character length</span>
            <span>{length}</span>
          </div>
          <input
            type="range"
            className="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        {/* checkboxes */}
        <div className="checkboxes-container">
          {dataArray.map((item, id) => {
            return (
              <Checkboxes
                key={item.id}
                name={item.name}
                id={item.name}
                onChange={() => handleCheckbox(id)}
                state={item.state}
              />
            );
          })}
        </div>
        {/* strong or not */}
        <StrongChecker password={password} />
        {/* generate btn */}
        {errorMsg && <span style={{ color: "red" }}> {errorMsg}</span>}
        <button
          type="submit"
          style={{ width: "100%", padding: "8px" }}
          onClick={() => generate(checkboxes, length)}
        >
          Generate password
        </button>
      </div>
    </div>
  );
}

export default App;
