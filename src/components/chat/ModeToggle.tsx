import type { Mode } from "./types";

type Props = {
  mode: Mode;
  setMode: (m: Mode) => void;
};

function ModeToggle({ mode, setMode }: Props) {
  return (
    <div className="mode-toggle">
      <button
        className={`mode ${mode === "textSpeak" ? "active" : ""}`}
        onClick={() => setMode("textSpeak")}
      >
        Text and Speak
      </button>
      <button
        className={`mode ${mode === "speakOnly" ? "active" : ""}`}
        onClick={() => setMode("speakOnly")}
      >
        Speak Only
      </button>
    </div>
  );
}

export default ModeToggle;

