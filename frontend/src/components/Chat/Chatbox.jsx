/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";

function Chatbox({fetchAgain,setFetchAgain}) {
  return (
    <Box
      d='flex'
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default Chatbox