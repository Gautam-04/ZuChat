import { useState } from "react";
import {Box} from '@chakra-ui/layout'
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function Mychats({fetchAgain}) {

    const[loggedUser,setLoggedUser] = useState(false);
    const[email,setEmail] = useState("");

    const fetchChats = async() => {};

    const handleSearch = async() => {};

  return (
    <Box display="flex" flexDir="column" p={3} bg={"white"} width="100%" w={{base: "85%", md: "30%"}} borderRadius="lg" borderWidth="1px">
        <div className="mychats_createGroupDiv">
            <h1>Chats</h1>
            <IconButton onClick={console.log("create group")} variant='outline' isRound={true} size="lg" icon={<AiOutlineUsergroupAdd />} border="none" />
        </div>
        <Box>
            <InputGroup >
            <Input placeholder="Search User by Email" size="md" variant="filled" />
            <InputRightElement>
            <IconButton onClick={handleSearch} variant='outline' isRound={true} size="sm" icon={<FiSearch />} border="none" />
            </InputRightElement>
            </InputGroup>
        </Box>
        <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden" mt={"1rem"}>
        Hello wor
        </Box>
    </Box>
  )
}

export default Mychats