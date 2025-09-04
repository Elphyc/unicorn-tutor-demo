import "./styles/index.css";
import Avatar from "./components/Avatar";
import ChatArea from "./components/ChatArea";

function App() {
  return (
    <div className="app">
      <div className="left">
        <Avatar />
      </div>
      <div className="right">
        <ChatArea />
      </div>
    </div>
  );
}

export default App;
