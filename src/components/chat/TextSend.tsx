type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

function TextSend({ value, onChange, onSend }: Props) {
  return (
    <div className="text-send">
      <input
        className="text-input"
        placeholder="Aa"
        aria-label="Message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button
        type="button"
        className="send-btn"
        onClick={onSend}
        aria-label="Send"
        disabled={!value.trim()}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z" fill="#111" />
        </svg>
      </button>
    </div>
  );
}

export default TextSend;
