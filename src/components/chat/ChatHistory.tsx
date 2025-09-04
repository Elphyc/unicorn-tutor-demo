import { useEffect, useRef, useState } from "react";
import type { Message } from "./types";

type Props = {
  messages: Message[];
  mode: string;
};

function ChatHistory({ messages, mode }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mode]);

  useEffect(() => {
    const el = historyRef.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollHeight > el.clientHeight + 1;
      setHasOverflow(overflow);
      setShowTopFade(overflow && el.scrollTop > 0);
    };

    update();
    const onScroll = () =>
      setShowTopFade(el.scrollTop > 0 && el.scrollHeight > el.clientHeight + 1);
    el.addEventListener("scroll", onScroll);

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [messages]);

  return (
    <div
      ref={historyRef}
      className={`chat-history ${hasOverflow && showTopFade ? "top-fade" : ""}`}
    >
      {messages.map((m) => (
        <div key={m.id} className={`msg ${m.role}`}>
          <div className="bubble">{m.text}</div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default ChatHistory;
