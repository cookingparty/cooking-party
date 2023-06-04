import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../store";
import { HailTwoTone } from "@mui/icons-material";

const Chat = () => {
  const { messages, auth, onlineUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  const chatMap = messages.reduce((acc, message) => {
    const withUser = message.fromId === auth.id ? message.to : message.from;
    const online = onlineUsers.find((user) => user.id === withUser.id);
    acc[withUser.id] = acc[withUser.id] || { messages: [], withUser, online };
    acc[withUser.id].messages.push({
      ...message,
      mine: auth.id === message.fromId,
    });
    return acc;
  }, {});

  const chats = Object.values(chatMap);

  return (
    <div>
      <h1>Chat</h1>
      <div id="chats">
        {chats.map((chat, i) => {
          return (
            <div key={i} id="chat" className={chat.online ? "online" : ""}>
              <h3>{chat.withUser.username}</h3>
              <ul className="chat">
                {chat.messages.map((message) => {
                  return (
                    <li
                      key={message.id}
                      className={message.mine ? "mine" : "yours"}
                    >
                      <span className="fromLabel">
                        {message.mine ? "you" : chat.withUser.username}:
                      </span>
                      {message.txt}
                    </li>
                  );
                })}
              </ul>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  const txt = ev.target.querySelector("input").value;
                  dispatch(createMessage({ txt, toId: chat.withUser.id }));
                  ev.target.querySelector("input").value = "";
                }}
              >
                <input
                  placeholder={`send message to ${chat.withUser.username}`}
                />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
