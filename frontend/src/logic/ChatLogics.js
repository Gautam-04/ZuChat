export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender.id === m.sender.id &&
    messages[i].sender.id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender.id !== m.sender.id &&
      messages[i].sender.id !== userId) ||
    (i === messages.length - 1 && messages[i].sender.id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender.id !== m.sender.id ||
      messages[i + 1].sender.id === undefined) &&
    messages[i].sender.id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender.id !== userId &&
    messages[messages.length - 1].sender.id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender.id === m.sender.id;
};

export const getSender = (loggedUser, users) => {
  if (!users || users.length < 2) {
    return "Unknown Sender"; // Return a fallback value
  }
  return users[0]?.id === loggedUser?.id ? users[1].username : users[0].username;
};

export const getSenderProfile = (loggedUser, users) => {
  if (!users || users.length < 2) {
    return "Unknown Sender"; // Return a fallback value
  }
  return users[0]?.id === loggedUser?.id ? users[1].avatarUrl : users[0].avatarUrl;
};


export const getSenderFull = (loggedUser, users) => {
  if (!users || users.length === 0) return {};
  return users[0].id === loggedUser.id ? users[1] : users[0];
};