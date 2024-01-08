import { useEffect } from "react";
import "../Styles/chat.css"
import {user} from "../component/Join"
import socketIO from "socket.io-client"

const ENDPOINT = "http://localhost:4000";


const Chat = () => {
    const socket = socketIO(ENDPOINT , {transports:["websocket"]});
    useEffect(()=>{
        socket.on('connect' , ()=>{
            // alert("socket is connected..");
        })
    }, [socket])
  return (
    <>
     <div className="chatPage">
        <div className="chatContainer">
            <div className="header"></div>
            <div className="chatBox"></div>
            <div className="chatInput">
                <input type="text" id="chatInputi" />
                <button>send</button>
            </div>
            {user}
        </div>
     </div>
    </>
  )
}

export default Chat