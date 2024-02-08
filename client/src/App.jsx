// import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import SocketContextProvier from './socketContext';
import { NoPage, Login, SignUp, Room, Welcome } from "./pages";
import Home from "./components/Home";
import { useEffect } from "react";
import useSocket from "./hooks/useSocket";

function App() {
  const socket = useSocket(); 

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected socket.id : ', socket.id);
    })
  }, []);

  return (
    <>
        <div className="dark bg-background text-foreground min-h-screen font-montserrat">
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Welcome />} />
              {/* <Route path="room/:roomToken" element={<Room />}></Route> */}
              <Route path="/home/*" element={<Home />} />
              <Route path="/room" element={<Room />}></Route>
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
    </>
  );
}

export default App;
