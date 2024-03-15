import {createBrowserRouter , RouterProvider} from "react-router-dom";
import Join from "./component/Join.jsx";
import Chat from "./component/Chat.jsx";
import {action as chatAction} from './component/Chat.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Join/>
  },
  {
    path:'/chat',
    element:<Chat/>,
    action:chatAction
  },
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
