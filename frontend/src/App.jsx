import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Chat from "./pages/ChatPage/Chat"
import Auth from "./pages/Auth/Auth"
import { ChatState } from "./Context/ChatContext"
import { useEffect } from "react"

function App() {

  const {setUser} = ChatState();

  useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUser(userInfo);
  },[])
  

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </>
  )
}

export default App
