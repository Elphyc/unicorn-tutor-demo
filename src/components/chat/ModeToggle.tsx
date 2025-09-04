import type { Mode } from "./types";

type Props = {
  mode: Mode;
  setMode: (m: Mode) => void;
};

function ModeToggle({ mode, setMode }: Props) {
  return (
    <div
      className="mode-toggle"
      role="radiogroup"
      aria-label="Input mode"
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === "textSpeak"}
        className={`mode ${mode === "textSpeak" ? "active" : ""}`}
        onClick={() => setMode("textSpeak")}
      >
        Text and Speak
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === "speakOnly"}
        className={`mode ${mode === "speakOnly" ? "active" : ""}`}
        onClick={() => setMode("speakOnly")}
      >
        Speak Only
      </button>
    </div>
  );
}

export default ModeToggle;
