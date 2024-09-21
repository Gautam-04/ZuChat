import { useState } from "react";
import Chatbox from "../../components/Chat/Chatbox";
import Mychats from "../../components/Chat/Mychats";
import {Box} from '@chakra-ui/layout'

function Chat() {
  const [fetchAgain, setfetchAgain] = useState(false);
  return (
    <div style={{width: "100%"}}>
        <Box display='flex' justifyContent="space-around" w="100%" h="91.5vh" p="10px">
          <Mychats fetchChats={fetchAgain}/>
          <Chatbox fetchChats={fetchAgain} setfetchChats={setfetchAgain}/>
        </Box>
    </div>
  )
}

export default Chat