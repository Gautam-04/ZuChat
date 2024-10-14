/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const[user,setUser] = useState();
    const[chats,setChats] = useState();
    const [notification,setNotification] = useState([]);
    const[selectedChat,setSelectedChat] = useState()

    const navigate = useNavigate();
    

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("user"))

        setUser(userInfo);

        if(!userInfo) navigate();
    }, [navigate])

    return(
        <ChatContext.Provider value={{user,setUser,chats,setChats,notification,setNotification,selectedChat,setSelectedChat}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider;