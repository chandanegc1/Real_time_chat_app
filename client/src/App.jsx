import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Join from "./component/Join.jsx";
import Chat from "./component/Chat.jsx";

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
