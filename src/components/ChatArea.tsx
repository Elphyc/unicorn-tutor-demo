import { useMemo, useState, useEffect } from "react";
import ChatHistory from "./chat/ChatHistory";
import TextSend from "./chat/TextSend";
import MicButton from "./chat/MicButton";
import ModeToggle from "./chat/ModeToggle";
import type { Message, Mode } from "./chat/types";

function ChatArea() {
  const [mode, setMode] = useState<Mode>("textSpeak");
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  const seed = useMemo<Message[]>(
    () => [
      { id: "m1", role: "user", text: "Hello!" },
      { id: "m2", role: "assistant", text: "Hi there. How can I help?" },
      {
        id: "m3",
        role: "user",
        text: "Show me the chat layout with two modes.",
      },
      {
        id: "m4",
        role: "assistant",
        text: "You can switch between Speak Only and Text + Speak.",
      },
    ],
    []
  );

  useEffect(() => {
    setMessages((prev) => (prev.length ? prev : seed));
  }, []);


  const send = () => {
    if (!draft.trim()) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: draft.trim(),
    };
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Bubble tea night market scooter, temple lantern dumpling streetfood. MRT sunrise Taipei 101 noodle shop, alley cat raincoat betel nut stall. Betel palm typhoon umbrella, convenience store oden rice ball Kaohsiung harbor ferry.",
    };
    setMessages((m) => [...m, userMsg, assistantMsg]);
    setDraft("");
  };


  return (
    <div className="chat-area">
      <ChatHistory messages={messages} mode={mode} />

      <div className={`chat-input ${mode}`}>
        {mode === "textSpeak" && (
          <TextSend value={draft} onChange={setDraft} onSend={send} />
        )}

        <div className="mic-slot">
          <MicButton />
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}

export default ChatArea;
