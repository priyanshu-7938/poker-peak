import { React, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDown, ChevronUp, SendHorizontal } from "lucide-react";
import useSocket from "@/hooks/useSocket";

const Chats = ({ roomName }) => {
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [hideMessages, setHideMessages] = useState(false);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("message : ", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up event listener on unmount
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { roomName, message });
    setMessage("");
  };

  return (
    <main className="min-w-[250px] rounded-md bg-black/50  text-primary">
      <div className="flex flex-col space-y-3">
        <h1 className="text-primary font-xl bg-black/90 text-center p-3 rounded-t-md border-b border-accent">
          Messages
        </h1>
        <span
          className="absolute top-1 right-2 cursor-pointer hover:text-red-400"
          onClick={() => setHideMessages((prev) => !prev)}
        >
          {!hideMessages ? <ChevronDown size={22} /> : <ChevronUp size={22} />}
        </span>

        {/* messages display */}
        <section
          className={`max-h-[230px] overflow-y-scroll flex flex-col align-items-center space-y-1 w-full p-2 rounded-b-md bg-transparent
        scrollbar-thin scrollbar-w-1 scrollbar-thumb-red-700 scrollbar-track-gray-900 scrollbar-h-1 scrollbar-corner-inherit scrollbar-track-rounded-full ${
          hideMessages && "hidden"
        }
        `}
        >
          {messages.length > 0 &&
            messages.map((data, i) => {
              return (
                <p
                  className="flex flex-col space-y-1 w-full bg-black/40 border-b border-gray-700 p-2"
                  key={i}
                >
                  {data.message ? (
                    <>
                      <span className="text-[0.8rem] text-gray-400">
                        userId : {data.user}
                      </span>
                      <span>{data.message}</span>
                    </>
                  ) : (
                    <span>{data.event}</span>
                  )}
                </p>
              );
            })}
        </section>
        <div className="flex w-full rounded-md border border-gray-400">
          <Input
            className="flex-1 bg-transparent border-none outline-none"
            placeholder="Yooo !"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="text-[#91D076] border-l hover:text-black border-accent rounded-none bg-transparent "
          >
            <SendHorizontal />
          </Button>
        </div>
        <ul>
          {socket.current &&
            socket.current.rooms.map((room) => (
              <li key={room[0]}>{room[0]}</li>
            ))}
        </ul>
      </div>
    </main>
  );
};

export default Chats;
