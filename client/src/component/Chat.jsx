import { useEffect, useState } from "react";
import "../Styles/chat.css";
import { user } from "../component/Join";
import socketIO from "socket.io-client";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


let socket;
const ENDPOINT = "https://chat-app-backend-5.onrender.com";
// const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
  const navigate = useNavigate();
  let i=0;
  const [id, setid] = useState("");
  const [message, setmessage] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setid(socket.id);
    });

    socket.emit("joined", { user }); //emit means send the data

    socket.on("welcome", (data) => {
      setmessage([...message, data]);
      toast.success(data.message);
    });

    socket.on("userJoined", (data) => {
      setmessage([...message, data]);
      toast.success(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setmessage([...message, data]);
      toast.success(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setmessage([...message, data]);
    });
    return () => {
      socket.off();
    };
  }, [message]);
  return (
    <>
      <div className="chatContainer">
        <div className="page">
          <ReactScrollToBottom className="chatBox">
          <div className="header"><h3> {user} </h3></div>
            {message.map((item) => (
              <Message
                key={item.message}
                message={item.message}
                user={item.id === id ? "" : item.user}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>
          <div className="chatInput">
            <input type="text" id="chatInput" />
            <button onClick={send}>send</button>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Chat;
