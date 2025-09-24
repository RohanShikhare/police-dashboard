import Header from "./Components/Header/Header";
import "../src/Assets/css/Main.css";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="mainArea">
        <Sidebar/>
      </div>
    </>
  );
}

export default App;
