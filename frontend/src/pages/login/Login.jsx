import React, { useState } from 'react'
import { Client, Account, ID } from "appwrite";
import LoginForm from '../../components/login/LoginForm';
import SignUp from '../../components/signup/SignUp';
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import './Login.scss'

export default function Login() {
  // const client = new Client()
  //   .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  //   .setProject("64c4a3b087c9dd59d3ef"); // Your project ID

  //   const account = new Account(client);

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = formData;

  // function onChange(e) {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value,
  //   }));
  // }

  // const promise = account.create(ID.unique(), email, password);
  //  promise.then(
  //    function (response) {
  //      console.log(response);
  //    },
  //    function (error) {
  //      console.log(error);
  //    }
  //  );

  return (
    <section className="login">
      {/* <div className="div">
        <h1>Sign In</h1>
        <form >
          <div className="Form">
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div> */}
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text
            textAlign="center"
            fontSize="4xl"
            fontFamily="Montserrat"
            fontWeight="bold"
          >
            ZuChat
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"}>
          <Tabs variant="soft-rounded">
            <TabList
              alignItems="center"
              d="flex"
              justifyContent="center"
              mb={2}
            >
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </section>
  );
}
