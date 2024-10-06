/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {Box,Stack, Text} from '@chakra-ui/layout'
import { IconButton, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ChatState } from "../../Context/ChatContext";
import axios from "axios";
import ChatLoading from "../../Animations/Context";
import {getSender} from "../../logic/ChatLogics"

function Mychats({fetchAgain}) {
    const[email,setEmail] = useState("");

    const toast = useToast()

    const {user,chats,setChats,selectedChat,setSelectedChat} = ChatState();

    const accessToken = localStorage.getItem("accessToken")

    const fetchChats = async() => {
      
        try {
          const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      } 
      //http://localhost:8000
          const {data} = await axios.get('/api/v1/chat/fetchchat',config);
          setChats(data)
      }
      catch (error) {
        console.log(error)
          toast({
            title: "Error Occured!",
            description: "Failed to Load the chats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          })
        }
    };

    useEffect(() => {
      fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAgain])
    

    const handleSearch = async() => {};

    const groupCreation = async() => {};

  return (
    <Box display={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" p={3} bg={"white"} width="100%" w={{base: "85%", md: "30%"}} borderRadius="lg" borderWidth="1px">
        <div className="mychats_createGroupDiv">
            <h1>Chats</h1>
            <IconButton onClick={groupCreation} variant='outline' isRound={true} size="lg" icon={<AiOutlineUsergroupAdd />} border="none" />
        </div>
        <Box>
            <InputGroup >
            <Input placeholder="Search User by Email" size="md" variant="filled" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <InputRightElement>
            <IconButton onClick={handleSearch} variant='outline' isRound={true} size="sm" icon={<FiSearch />} border="none" />
            </InputRightElement>
            </InputGroup>
        </Box>
        <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden" mt={"1rem"}>
        {chats ? (
          <Stack overflowY="auto">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user._id, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.username} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
        </Box>
    </Box>
  )
}

export default Mychats