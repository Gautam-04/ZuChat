import React, { useEffect } from 'react'
import Login from '../../components/Authentication/Login';
import Signup from '../../components/Authentication/Signup';
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

export default function LoginPage() {

    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (user) navigate("/chats");
    }, [navigate]);

  return (
    <section className="login">
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
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
              display="flex"
              justifyContent="center"
              mb={2}
            >
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </section>
  );
}
