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
          <div style={{ display: "flex"}} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? "#6E00FF" : "#E7E7E7"}`,
                color: `${m.sender._id === user._id ? "#FFF" : "#000"}`,
                alignSelf: `${m.sender._id === user._id ? "flex-end" : "flex-start"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 5 : 10,
                borderRadius: `${m.sender._id === user._id ? "15px 15px 0px 15px" : "15px 15px 15px 0px"}`,
                padding: "8px 12px",
                maxWidth: "65%",
                fontSize: "15px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.12)",
                border: `1px solid ${m.sender._id === user._id ? "#DCF8C6" : "#EDEDED"}`,
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