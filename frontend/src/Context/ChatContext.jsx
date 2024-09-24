/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"


const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const[userId,setUserId] = useState();
    const[chats,setChats] = useState();
    const [notification,setNotification] = useState([]);
    const[selectedChat,setSelectedChat] = useState()
    

    return(
        <ChatContext.Provider value={{userId,setUserId,chats,setChats,notification,setNotification,selectedChat,setSelectedChat}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider;