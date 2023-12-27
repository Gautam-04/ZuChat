import React, { useEffect } from 'react'
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
} from "@chakra-ui/react";
import './Login.scss'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (user) navigate("/chats");
    }, [navigate]);

  return (
    <section className="login">
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
