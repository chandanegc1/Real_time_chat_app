import { useEffect, useState } from "react";
import "../Styles/chat.css"
import {user} from "../component/Join"
import socketIO from "socket.io-client"


let socket;
const ENDPOINT = "http://localhost:4000";

const Chat = () => {
    const [id , setid] = useState("");


    const send = ()=>{
        const message = document.getElementById("chatInput").value ;
        socket.emit('message' , {message , id});
        document.getElementById("chatInput").value = "";
    }
    
    console.log(user)
    useEffect(()=>{
        socket = socketIO(ENDPOINT , {transports:["websocket"]});

        socket.on('connect' , ()=>{
            alert("socket is connected..");
            setid(socket.id);
        })

        socket.emit('joined' , {user})              //emit means send the data

        socket.on('welcome' , (data)=>{
            console.log(data.user , data.message);
        })
           
        socket.on('userJoined' , (data)=>{
            console.log(data.user , data.message);
        })

        socket.on('leave',(data)=>{
            console.log(data.user , data.message);
        })

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(()=>{
        socket.on("sendmessage" , (data)=>{
             console.log(data.id , data.message );
        })
        return ()=>{

        }
    })


  return (
    <>
     <div className="chatPage">
        <div className="chatContainer">
            <div className="header"></div>
            <div className="chatBox"></div>
            <div className="chatInput">
                <input type="text" id="chatInput" />
                <button onClick={send}>send</button>
            </div>
            {user}
        </div>
     </div>
    </>
  )
}

export default Chat
