/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {Box,Stack, Text} from '@chakra-ui/layout'
import { Avatar, IconButton, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { ChatState } from "../../Context/ChatContext";
import axios from "axios";
import ChatLoading from "../../Animations/Context";
import {getSender} from "../../logic/ChatLogics"

function Mychats({fetchAgain}) {
    const[email,setEmail] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const toast = useToast()

    const {user,chats,setChats,selectedChat,setSelectedChat,} = ChatState();

    const accessToken = localStorage.getItem("accessToken")

    const fetchChats = async() => {
        try {
          const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      } 
          const {data} = await axios.get('/api/v1/chat/fetchchat',config);
          // console.log(data)
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
}, [fetchAgain]);

    useEffect(() => {
        fetchChats();
    }, [chats])
    

    const handleSearch = async() => {
      if (!email) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axios.post(`/api/v1/users/search`,{email}, config);
      console.log(data)
      setLoading(false);
      setEmail("")
      setSearchResult([data.searchedUser]);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    };

    const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.post(`/api/v1/chat/accesschat`, { userId }, config);
      console.log(data)

      if (!chats.find((c) => c.id === data.id)) setChats([data, ...chats]);
      setSelectedChat(data.fullChat);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

    const groupCreation = async() => {};

  return (
    <Box display={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" p={3} bg={"white"} width="100%" w={{base: "85%", md: "30%"}} borderRadius="lg" borderWidth="1px">
        <div className="mychats_createGroupDiv">
            <h1>Chats</h1>
            <IconButton onClick={groupCreation} variant='outline' isRound={true} size="lg" icon={<AiOutlineUsergroupAdd />} border="none" />
        </div>
        <Box>
        <InputGroup>
          <Input
            placeholder="Search User by Email"
            size="md"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              onClick={handleSearch}
              variant="outline"
              isRound={true}
              size="sm"
              icon={<FiSearch />}
              border="none"
            />
          </InputRightElement>
        </InputGroup>
      </Box>

{loading ? (
        <ChatLoading />
      ) : (
        searchResult?.length > 0 && (
          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#F8F8F8"
            w="100%"
            borderRadius="lg"
            mt={"1rem"}
          >
            <Stack overflowY="auto">
              {searchResult.map((user) => (
                <Box
                  key={user.id}
                  onClick={() => accessChat(user.id)}
                  cursor="pointer"
                  bg="#E8E8E8"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                >
                  <Avatar
                    src={user?.avatarUrl} // Replace with actual avatar source
                    alt={user?.username} // Replace with actual alt text
                    borderRadius="full"
                    boxSize="40px"
                    mr={3} // Add margin-right for spacing
                  />
                  <Box>
                    <Text fontWeight="bold" fontSize="md">
                      {user.username}
                    </Text>
                    <Text fontSize="sm" color="#000">
                      {user.email}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )
      )}

{/* Existing Chats */}
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
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
              
                <Box display="flex" alignItems="center">
    <Avatar
      src={chat.latestMessage?.sender?.avatarUrl} // Replace with actual avatar source
      alt={chat.latestMessage?.sender?.username}  // Replace with actual alt text
      borderRadius="full"
      boxSize="40px"
      mr={3} // Add margin-right for spacing
    />
    <Box>
      <Text fontWeight="bold" fontSize="md">
        {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
      </Text>
      {chat.latestMessage && (
        <Text fontSize="sm" color="#000">
          <b>{chat.latestMessage.sender.username}:</b>{" "}
          {chat.latestMessage.content.length > 20
            ? chat.latestMessage.content.substring(0, 21) + "..."
            : chat.latestMessage.content}
        </Text>
      )}
    </Box>
  </Box>

  {/* Time Section */}
  <Box textAlign="right">
    <Text fontSize="xs" color="#000">
      {new Date(chat.latestMessage?.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </Text>
  </Box>
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