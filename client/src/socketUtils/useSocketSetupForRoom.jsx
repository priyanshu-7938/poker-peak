import { useEffect } from "react";
import { socket } from "../socket";

const useSocketSetupForRoom = () => {
    useEffect(() => {
        socket.on("recieve_message",(data) => {alert("wallha",data.event)});
        return ()=>{
            socket.off("connectionDone");
        }  
    },[socket]);
}

export default useSocketSetupForRoom;