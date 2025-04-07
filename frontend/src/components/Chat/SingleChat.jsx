/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Image, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../logic/ChatLogics";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client"
import { ChatState } from "../../Context/ChatContext";
import animationData from "../../Animations/typing.json"
var selectedChatCompare;
import { MdCall, MdVideocam } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import ScrollableChat from "./ScrollableChat";
// import ProfileModal from "../miscellaneous/ProfileModal";
import Lottie from "react-lottie";
const ENDPOINT = "http://13.49.76.253:8080";
let socket;


function SingleChat({ fetchAgain = false, setFetchAgain = () => {} }) {
  const [messages,setMessages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [newMessage,setNewMessage] = useState("");
  const [socketConnected,setSocketConnected] = useState(false);
  const [typing,setTyping] = useState(false);
  const toast = useToast();
  console.log(fetchAgain);

  const messagesEndRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, user, notification, setNotification } = ChatState();

  const fetchMessages = async() =>{
    if(!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.id}`,
        }
      }

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


useEffect(() => {
  fetchMessages();
  selectedChatCompare = selectedChat;

  const interval = setInterval(() => {
    fetchMessages();
  }, 3000); // 10 seconds

  return () => clearInterval(interval); // cleanup on unmount or when chat changes
}, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved",(newMessageReceived)=>{
      console.log(newMessageReceived);
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
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <Box
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontFamily="Work sans"
      >
        <Box display="flex" alignItems="center">
          <Image
            src={getSenderFull(user, selectedChat.users).avatarUrl}
            alt={getSenderFull(user, selectedChat.users).username}
            borderRadius="full"
            boxSize="40px"
            mr={3}
          />
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
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
            <Text fontSize="sm" color="gray.500">
              Online - Last seen, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" height={"100%"}>
          <IconButton
            aria-label="Call"
            icon={<MdCall />}
            variant="ghost"
            colorScheme="purple"
            mr={2}
          />
          <IconButton
            aria-label="Video"
            icon={<MdVideocam />}
            variant="ghost"
            colorScheme="purple"
            mr={2}
          />
          <IconButton
            aria-label="More options"
            icon={<FiMoreVertical />}
            variant="ghost"
            colorScheme="purple"
          />
        </Box>
      </Box>

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
            <div ref={messagesEndRef}></div>
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
          ) : null}
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