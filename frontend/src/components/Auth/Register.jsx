/* eslint-disable no-unused-vars */
import { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { ChatState } from "../../Context/ChatContext";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const[show,setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShow = () => {setShow(!show)}

  const {setUser} = ChatState() 
//
  const submitHandler = async() => {
    setPicLoading(true)
    if (!username || !email || !password || !dob) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[#@]).{8,}$/;
  if (!passwordRegex.test(password)) {
    toast({
      title: "Invalid Password",
      description: "Password must be at least 8 characters long and include '#' or '@'.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
      const data = await axios.post("/api/v1/users/register",{username,email,dob,password,avatar},config);
      toast({
        title: "User Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.setItem('accessToken',data.data.accessToken)
      localStorage.setItem('user',JSON.stringify(data.data.createdUser))
      setUser(JSON.stringify(data.data.createdUser))
      navigate('/chat');
      setPicLoading(false);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  }

  return (
    <VStack spacing="5px">
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' placeholder="Enter your unique username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder="Enter your unique Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input type='date' value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
        </FormControl>
        <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
        <FormControl>
          <FormLabel>Upload your Picture</FormLabel>
          <Input type='file' accept="image/*" onChange={(e)=>{setAvatar(e.target.files[0])}}/>
        </FormControl>
        <Button className="RegisterButton"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Register