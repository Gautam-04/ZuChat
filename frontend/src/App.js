import Main from "./pages/Mainpage/Main";
import Login from "./pages/login/Login";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
