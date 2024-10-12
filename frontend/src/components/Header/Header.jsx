import HeaderIcon from '../../assets/favicon.svg'
import { IconButton, HStack, Box, Badge, useToast } from '@chakra-ui/react';
import { FaHome, FaBell, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { ChatState } from '../../Context/ChatContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Header() {
  const {user,setUser,notifications} = ChatState();

  const toast = useToast();

  const navigate = useNavigate();

  const logoutFunction = async() =>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      await axios.post("/api/v1/users/logout",config);
      toast({
        title: "User LoggedOut Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.clear()
      setUser();
      navigate('/auth');
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
    }
  }

  return (
    <div className="HeaderCompleteDiv">
    {user ? (
          <IconButton aria-label="Profile" icon={<FaUserCircle />} />
      ) : null}

      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img src={HeaderIcon} alt="" className="headerImg" />
          <h1 className="HeaderTitle" onClick={()=>navigate('/')}>ZUCHAT</h1>
        </div>

        {user ? (
        <HStack spacing={4} position="relative">
          <IconButton aria-label="Home" icon={<FaHome />} />
          
          {/* Notification icon with counter badge */}
          <Box position="relative">
            <IconButton aria-label="Notifications" icon={<FaBell />} />
            {notifications > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                borderRadius="full"
                bg="red.500"
                color="white"
                fontSize="0.8em"
                px={2}
              >
                {notifications}
              </Badge>
            )}
          </Box>
          
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <IconButton aria-label="Logout" icon={<FaSignOutAlt />} onClick={logoutFunction} />
        </HStack>
      ) : null}
    </div>
  )
}

export default Header