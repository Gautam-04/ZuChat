import React from 'react'
import { Box } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider'
import SideSearch from '../../components/MainPage/SideSearch';
import Chats from '../../components/MainPage/Chats'
import ChatArea from '../../components/MainPage/ChatArea'
const ChatPage = () => {
  const {user} = ChatState();
}

function Main() {
  return (
    <div style={{ width: "100%" }}>
      {/* When backend is done */}
      {/* {user && <SideSearch />} */}
      {/* {user && <Chats />} */}
      {/* {user && <ChatArea />} */}
      <SideSearch />
      <Box display="flex"
       justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <Chats />
        <ChatArea />
      </Box>
    </div>
  );
}

export default Main