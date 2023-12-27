import React from 'react'
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  Button,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {

  const toast = useToast();
  const navigate = useNavigate();

const handleClick = () => setShow(!show);

const [show, setShow] = useState(false);
const [email, setEmail] = useState();
const [password, setPassword] = useState();
 const [loading, setLoading] = useState(false);

 async function submitHandler(){
  setLoading(true);
  if (!email || !password) {
    toast({
      title: "Please Fill all the Feilds",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  try {
     const config = {
       headers: {
         "Content-type": "application/json",
       },
     };

     const { data } = await axios.post(
       "/api/user/login",
       { email, password },
       config
     );

     // console.log(JSON.stringify(data));
     toast({
       title: "Login Successful",
       status: "success",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
     localStorage.setItem("userInfo", JSON.stringify(data));
     setLoading(false);

     navigate("/chats");
  } catch (error) {
     toast({
       title: "Error Occured!",
       description: error.response.data.message,
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
     setLoading(false);
  }
 }

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={"password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@sample.com");
          setPassword("46416");
        }}
        isLoading={loading}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default LoginForm