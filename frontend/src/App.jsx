import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Chat from "./pages/ChatPage/Chat"
import Auth from "./pages/Auth/Auth"

function App() {
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
