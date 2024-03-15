import { useEffect, useState } from "react";
import "../Styles/chat.css";
import { user } from "../component/Join";
import socketIO from "socket.io-client";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";

export const action = async()=>{
  document.getElementById("chatInput").value = "";
  return null;
}

let socket;
// const ENDPOINT = "https://rbcijuzxxn.ap-south-1.awsapprunner.com/";
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
  const navigate = useNavigate();
  let i=0;
  const [id, setid] = useState("");
  const [message, setmessage] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    if(message==="")
       return null;
    socket.emit("message", { message, id });
    
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
      socket.emit("message", { message, id });
      toast.success(data.user);
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
          <Form method="post" className="chatInput">
            <input type="text" id="chatInput" />
            <button onClick={send}>send</button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chat;
