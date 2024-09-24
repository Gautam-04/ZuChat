/* eslint-disable react/prop-types */
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import{isSameSender,isLastMessage,isSameSenderMargin,isSameUser} from '../../logic/ChatLogics'
import {ChatState} from '../../Context/ChatContext';

function ScrollableChat({messages}) {
    const {userId} = ChatState();
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i)=>(
            <div style={{display: 'flex'}} key={m._id}>
                {(isSameSender(messages,m,i,userId) || isLastMessage(messages, i, userId)) && (
                    <Tooltip label={m.sender.username} placement="bottom-start" hasArrow>
                <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.username} src={m.sender.avatar} />
            </Tooltip>
                )}
                <span style={{backgroundColor: `${m.sender._id === userId ? "#fff" : "#6E00FF"}`,
                marginLeft: isSameSenderMargin(messages, m, i, userId),
                marginTop: isSameUser(messages, m, i, userId) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                }}>
                    {m.content}
                </span>
            </div>
            
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat