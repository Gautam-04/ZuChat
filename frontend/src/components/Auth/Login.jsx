/* eslint-disable no-unused-vars */
import { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import axios from "axios"
import {useNavigate} from 'react-router-dom';

function Login() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[show,setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  const handleShow = () => {!show}

    const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async() => {

    setPicLoading(true)
    if ( !email || !password ) {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      const data = await axios.post("/api/v1/users/login",{email,password},config);
      toast({
        title: "User LoggedIn Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      console.log(data);
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
        {/* <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' placeholder="Enter your unique username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </FormControl> */}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder="Enter your unique Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
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

export default Login