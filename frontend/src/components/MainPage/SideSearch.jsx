import React, { useState } from "react";
import { Box, Button, Tooltip,Text, Menu, MenuButton, MenuList, Avatar, MenuDivider, MenuItem, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Toast, position, useToast } from "@chakra-ui/react";
import { ArrowDownIcon,BellIcon } from "@chakra-ui/icons";
import ChatState from '../../Context/ChatProvider';
import { redirect } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

function SideSearch() {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const Toast = useToast();

    function handleSearch(){
if(!search) {
  Toast({
    title: "Enter some input",
    status: 'warning',
    isClosable: "true",
    duration: 5000,
    position: 'top-left'
  })
}
    }

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    redirect("/");
  }

  // const { user } = ChatState();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={"whitesmoke"}
        w="full"
        p="5px 10px 5px 10px"
        borderWidth="2px"
      >
        <Tooltip placement="bottom-end" hasArrow label="Search People">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Montserrat">
          ZuChat
        </Text>
        <div>
          <Menu>
            <MenuButton p={2}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              p={2}
              as={Button}
              rightIcon={<ArrowDownIcon fontSize="2xl" m={1} />}
            >
              <Avatar size="sm" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search By name or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>
                <i class="fas fa-search"></i>
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideSearch;
