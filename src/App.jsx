import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'
import Login from './components/page/Login'
import Registration from './components/page/Registration'
import firebaseConfig from "./components/firebase/firebaseConfig";
import ForgotPassword from "./components/page/ForgotPassword";
import Home from "./components/page/Home";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Grouplist from "./components/GroupList/Grouplist";
import Message from "./components/Message/Message";
import Setting from "./components/page/Setting";

function App() {
 
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/msg",
    element: <Message/>,
  },
  {
    path: "/setting",
    element: <Setting/>,
  },
]);

  return (
    <>
     <RouterProvider router={router} />,
    </>
  )
}

export default App
