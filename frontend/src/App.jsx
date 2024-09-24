import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Chat from "./pages/ChatPage/Chat"
import Auth from "./pages/Auth/Auth"
import { ChatState } from "./Context/ChatContext"
import { useEffect } from "react"

function App() {

  const {setUserId} = ChatState();

  useEffect(() => {
      setTimeout(() => {
        if (document.cookie === "") {
                // Reset the access token if no cookies exist
                localStorage.setItem("accessToken", ""); // or null
                console.log("Access token has been reset due to absence of cookies.");
            }else{
              const userInfo = localStorage.getItem("accessToken")
              setUserId(userInfo)
            }
      });
  })
  

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
