import { useParams, useSearchParams } from "@remix-run/react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSocket } from "~/context";
import { useMessages } from "~/context/messages";

export type Message = {
  id: string;
  text: string;
  user: string;
};

const messages: Message[] = [];

export default function Chat() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const socket = useSocket();
  const [search] = useSearchParams();

  const user = search.get("user") ?? "";

  const { addMessage, messages } = useMessages();

  function submitMessage() {
    const message: Message = {
      id: new Date().toISOString(),
      text: ref.current?.value ?? "",
      user,
    };

    console.log("komt hier?");

    addMessage(message);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("event", (data) => {
      console.log("CHAT:", data);
    });

    socket.emit("event", "ping");
  }, [socket]);

  useEffect(() => {
    console.log("Messages vernieuwd!", messages);
  }, [messages]);

  // function handleSend() {
  //   socket?.emit("sendMessage", "dit is het bericht");

  //   if (socket) {
  //     console.log("Doet deze het wel?");
  //     socket.emit("sendMessage", "dit is het bericht");
  //   } else {
  //     console.log("er is geen socket!");
  //   }
  // }

  return (
    <div className="flex h-screen flex-col bg-slate-300">
      <div id="content" className="flex-1 border-2 border-blue-400">
        <h1>Chat</h1>
        <div>
          {messages.map((message, index) => {
            <div className="border-2 border-red-300" key={index}>
              <p>{`Bericht: ${message.text}`}</p>
            </div>;
          })}
        </div>
      </div>
      <div id="message" className="border-2 border-red-400 p-2">
        <form method="post">
          <label htmlFor="message">Bericht</label>
          <textarea ref={ref} name="message" id="message" rows={6} />
          <button
            type="button"
            onClick={submitMessage}
            className="rounded-md bg-blue-700 p-1 text-white"
          >
            Verstuur
          </button>
        </form>
      </div>
    </div>
  );
}
