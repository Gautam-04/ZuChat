/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { ChatState } from "../../Context/ChatContext";
import {uploadToS3} from "../../utils/s3bucket"


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

  // useEffect(() => {
  //   setAvatarUrl()
  // },[avatar])
//
const submitHandler = async() => {
  setPicLoading(true);
  
  // Form validation
  if (!username || !email || !password || !dob) {
    toast({
      title: "Please Fill all the Fields",  // Fixed typo in "Fields"
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }
  
  // Password validation
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

  // Avatar validation  
  if (!avatar) {
    toast({
      title: "Please select a profile picture",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }
  
  try {
    // Upload image first and wait for URL
    const uploadedAvatarUrl = await uploadToS3(avatar);
    
    if (!uploadedAvatarUrl) {
      toast({
        title: "Error Occurred!",
        description: "Failed to upload image. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    
    // Set the correct content type for JSON data
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    
    // Now use the returned URL from the upload function
    const response = await axios.post(
      "/api/v1/users/register",
      {
        username,
        email,
        dob,
        password,
        avatarUrl: uploadedAvatarUrl  // Use the URL from the upload function
      },
      config
    );
    
    toast({
      title: "User Created Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.createdUser));
    setUser(response.data.createdUser);
    navigate('/chat');
  } catch (error) {
    console.log(error);
    toast({
      title: "Error Occurred!",
      description: error.response?.data?.message || "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  } finally {
    setPicLoading(false);
  }
};

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