import {Container,Box,Tabs,TabList,Tab,TabPanels,TabPanel} from '@chakra-ui/react'
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register"
import './Auth.css'
import { useEffect } from 'react';
import { ChatState } from '../../Context/ChatContext';
import { useNavigate } from 'react-router-dom';

function Auth() {

  const navigate = useNavigate()

  const {user} = ChatState();
  
  useEffect(() => {
    if (user) navigate("/chat")
      else navigate('/auth')
  },[])


  return (
    <section className="auth">
      <Container maxW="xl" centerContent>
        <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"} >
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
      </Container>
    </section>
  )
}

export default Auth