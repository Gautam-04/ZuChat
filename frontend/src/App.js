import Main from "./pages/Mainpage/Main";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chats" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
