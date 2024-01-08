import socketIO from "socket.io-client"
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Join from "./component/Join.jsx";
import Chat from "./component/Chat.jsx";
// import "./Styles/Join.css"

const ENDPOINT = "http://localhost:4000/";
const socket = socketIO(ENDPOINT , {transports:['websocket']});

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Join/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </Router>
  )
}

export default App
