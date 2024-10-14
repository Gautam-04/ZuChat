import {Container,Box,Tabs,TabList,Tab,TabPanels,TabPanel, Flex, Image} from '@chakra-ui/react'
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register"
import './Auth.css'
import { useEffect } from 'react';
import { ChatState } from '../../Context/ChatContext';
import { useNavigate } from 'react-router-dom';
import AuthIcon from "../../assets/auth.svg"

function Auth() {

  const navigate = useNavigate()

  const {user} = ChatState();
  
  useEffect(() => {
    if (!user) navigate("/auth")
      else navigate('/chat')
  },[navigate, user])


  return (
    <section className="auth">
      <Container w="100%" maxWidth="100%" centerContent>
        <Flex bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"} flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="center">
          {/* Left side: Image */}
          <Box w={{ base: "100%", md: "50%" }} maxWidth="80%" textAlign="center" mb={{ base: 4, md: 0 }}>
            <Image src={AuthIcon} alt="Auth Icon" padding="10%" maxW="80%" mx="auto" />
          </Box>
          
          {/* Right side: Login/Signup Tabs */}
          <Box w={{ base: "100%", md: "50%" }} p="5%">
            <h1>Welcome to <span>Zuchat</span></h1>
            <Tabs variant="soft-rounded" colorScheme='green'>
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
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Container>
    </section>
  )
}

export default Auth