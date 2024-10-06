/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../logic/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import {io} from "socket.io-client"
import { ChatState } from "../../Context/ChatContext";
import animationData from "../../Animations/typing.json"
var selectedChatCompare;
import { SlLogout } from "react-icons/sl";
import ScrollableChat from "./ScrollableChat";
import ProfileModal from "../miscellaneous/ProfileModal";
import Lottie from "react-lottie";
const ENDPOINT = "http://localhost:8000";
let socket;


function SingleChat({fetchAgain, setFetchAgain}) {
  const [messages,setMessages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newMessage,setNewMessage] = useState("");
  const [socketConnected,setSocketConnected] = useState(false);
  const [typing,setTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const fetchMessages = async() =>{
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user._id}`,
        }
      }

      setLoading(true);
      const {data} = await axios.post(`/api/v1/message/${selectedChat._id}`,config);
      setMessages(data.messages);
      setLoading(false);

      socket.emit("join room", selectedChat._id)
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

    const sendMessage= async(e) => {
    if(e.key === 'Enter' && newMessage){
      socket.emit("stoptyping", selectedChat);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/v1/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  }

  useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", user);

      socket.on("connect", () => {
        setSocketConnected(true);
        console.log(`Socket connected successfully ${socket.id}`);
      });

      socket.on("typing", () => setTyping(true));
      socket.on("stop typing", () => setTyping(false));
  },[])



  useEffect(()=>{
    fetchMessages();
    selectedChatCompare = selectedChat;
  },[selectedChat])

  useEffect(() => {
    socket.on("message recieved",(newMessageReceived)=>{
      if (!selectedChatCompare || selectedChatCompare?._id !== newMessageReceived?.chat?._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    })
  })
  


  const typingHandler= async(e) => {
    setNewMessage(e.target.value);
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing", selectedChat._id);

      setTimeout(() => {
        socket.emit("stop typing", selectedChat._id);
      setTyping(false);
      }, 2000);
    }
  }
  

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<SlLogout color="#000"/>}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#fff"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} className="scrollChatDiv"/>
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {typing ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{marginBottom: 15, marginLeft: 0}}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat