import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { useSocket } from "~/context";
import { Message } from "~/routes/chat";

type Context = {
  addMessage: (message: Message) => void;
  messages: Message[];
};

const context = createContext<Context>({ addMessage() {}, messages: [] });

export function useMessages() {
  return useContext(context);
}

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  function addMessage(message: Message) {
    setMessages((value) => [...value, message]);

    socket?.emit("sendMessage", { ...message, bericht: "Gaat goed?" });
  }

  return (
    <context.Provider value={{ addMessage, messages }}>
      {children}
    </context.Provider>
  );
}
