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
function LoginForm() {

const handleClick = () => setShow(!show);

const [show, setShow] = useState(false);
const [email, setEmail] = useState();
const [password, setPassword] = useState();

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
        // onClick={submitHandler}
        // isLoading={picLoading}
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
        // isLoading={picLoading}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default LoginForm