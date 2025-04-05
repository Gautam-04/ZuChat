/* eslint-disable react/prop-types */
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import{isSameSender,isLastMessage,isSameSenderMargin,isSameUser} from '../../logic/ChatLogics'
import {ChatState} from '../../Context/ChatContext';

function ScrollableChat({messages}) {
    
  const { user } = ChatState();

  if (!Array.isArray(messages)) {
    return <div>No messages to display</div>;
  }
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex"}} key={m.id}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip label={m.sender.username} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.username}
                  src={m.sender.avatarUrl}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${m.sender.id === user.id ? "#6E00FF" : "#E7E7E7"}`,
                color: `${m.sender.id === user.id ? "#FFF" : "#000"}`,
                alignSelf: `${m.sender.id === user.id ? "flex-end" : "flex-start"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 5 : 10,
                borderRadius: `${m.sender.id === user.id ? "15px 15px 0px 15px" : "15px 15px 15px 0px"}`,
                padding: "8px 12px",
                maxWidth: "65%",
                fontSize: "15px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
                border: `1px solid ${m.sender.id === user.id ? "#DCF8C6" : "#EDEDED"}`,
              }}
              >
                {m.content}
              </span>

          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat