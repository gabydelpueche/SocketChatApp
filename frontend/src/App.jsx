import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Nav from "./components/Navbar.jsx";
import { useContext } from "react";
import AuthContext from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";

export default function App() {
    const {user} = useContext(AuthContext)
  return(
    <>
      <ChatContextProvider user = {user}>
        <Nav />
        <Routes>
            <Route path="/" element={user ? <Chat /> : <Login/>} />
            <Route path="/register" element={user ? <Chat /> : <Register/>} />
            <Route path="/login" element={user ? <Chat /> : <Login/>} />
        </Routes>
      </ChatContextProvider>
    </>
  )
}