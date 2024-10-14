import { useEffect, useState } from "react";
import Chatbox from "../../components/Chat/Chatbox";
import Mychats from "../../components/Chat/Mychats";
import {Box} from '@chakra-ui/layout'
import { ChatState } from "../../Context/ChatContext";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate()
  const{user} = ChatState()

  useEffect(() => {
    if (!user) {
      navigate("/auth"); 
    }
  }, [user, navigate]);

  return (
    <div style={{width: "100%"}}>
        <Box display='flex' justifyContent="space-around" w="100%" h="91.5vh" p="10px">
          <Mychats fetchChats={fetchAgain}/>
          <Chatbox fetchChats={fetchAgain} setFetchAgain={setFetchAgain}/>
        </Box>
    </div>
  )
}

export default Chat