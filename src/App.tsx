import { useState } from "react";
import unicornLogo from "/unicornTutor.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={unicornLogo} className="logo" alt="Unicorn Tutor logo" />
      </div>
      <h1>Unicorn Tutor</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Welcome to Unicorn Tutor - Your magical learning companion
      </p>
    </>
  );
}

export default App;
