import React, { useState } from "react";
import "../Styles/join.css"
import { Link } from "react-router-dom"

let user;



const sendUser = ()=>{
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
}

const Join = () => {
    const [name , setName] = useState("");
  return (
    <div className="join_page">
        <div className="join-container">
            <h1>C CHAT</h1>
            <input onChange={(e)=> setName(e.target.value)} type="text" id="joinInput" />
            <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
        </div>
    </div>
  )
}

export default Join
export {user}