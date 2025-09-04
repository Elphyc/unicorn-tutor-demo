import { useEffect, useRef, useState, type ReactElement } from "react";
import sakuraImg from "../../assets/sakura.png";
import sakuraDarkImg from "../../assets/sakuraDark.png";

function MicButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [displayLevel, setDisplayLevel] = useState(0);
  const [petalSeed, setPetalSeed] = useState(0);
  const [petalsVisible, setPetalsVisible] = useState(false);
  const [petalsFading, setPetalsFading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioCtxRef = useRef<any | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const lastPetalUpdateRef = useRef<number>(0);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      try {
        mediaRecorderRef.current?.stop();
      } catch {}
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      try {
        audioCtxRef.current?.close?.();
      } catch {}
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    };
  }, []);

  const beginLevelMeter = (stream: MediaStream) => {
    try {
      const AudioContextCtor: any =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextCtor();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyserRef.current = analyser;
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      const loop = () => {
        analyser.getByteTimeDomainData(dataArray);
        let sumSquares = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = (dataArray[i] - 128) / 128;
          sumSquares += v * v;
        }
        const rms = Math.sqrt(sumSquares / dataArray.length);
        const base = 0.08;
        const target = Math.max(Math.max(0, Math.min(1, rms * 2)), base);
        setDisplayLevel((prev) => {
          const alphaUp = 0.55;
          const alphaDown = 0.08;
          const alpha = target > prev ? alphaUp : alphaDown;
          return prev + (target - prev) * alpha;
        });

        const now = Date.now();
        if (now - lastPetalUpdateRef.current > 320) {
          lastPetalUpdateRef.current = now;
          setPetalSeed((s) => (s + 1) % 100000);
        }
        rafIdRef.current = requestAnimationFrame(loop);
      };
      rafIdRef.current = requestAnimationFrame(loop);
    } catch (e) {
      console.warn("AudioContext/Analyser not available", e);
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Microphone not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        chunksRef.current = [];
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        try {
          await audio.play();
        } catch (err) {
          const a = document.createElement("a");
          a.href = url;
          a.download = "recording.webm";
          a.click();
        }
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecording(false);
        setPetalsFading(true);
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = window.setTimeout(() => {
          setPetalsVisible(false);
          setPetalsFading(false);
          fadeTimeoutRef.current = null;
        }, 900);
      };

      recorder.start();
      setIsRecording(true);
      setDisplayLevel((prev) => Math.max(prev, 0.12));
      setPetalsFading(false);
      setPetalsVisible(true);
      beginLevelMeter(stream);
    } catch (err) {
      console.error(err);
      alert("Microphone permission denied or unavailable.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch {}
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = null;
    try {
      audioCtxRef.current?.close?.();
    } catch {}
    audioCtxRef.current = null;
  };

  const handleMicClick = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <button
      className={`mic-btn ${isRecording ? "recording" : ""}`}
      aria-label={isRecording ? "Stop and play" : "Record"}
      onClick={handleMicClick}
      style={
        isRecording
          ? {
              boxShadow: `0 0 0 ${Math.max(2, displayLevel * 12)}px rgba(255,255,255,0.10), 0 0 ${
                6 + displayLevel * 32
              }px 3px rgba(255,183,213,0.45)`,
            }
          : undefined
      }
    >
      {isRecording ? (
        <span className="mic-ellipsis" aria-hidden>
          <span className="dot" style={{ animationDelay: "0s" }} />
          <span className="dot" style={{ animationDelay: "0.18s" }} />
          <span className="dot" style={{ animationDelay: "0.36s" }} />
        </span>
      ) : (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3Zm-7-3a7 7 0 1 0 14 0h-2a5 5 0 1 1-10 0H5Z"
            fill="#fff"
          />
        </svg>
      )}
      {petalsVisible && (
        <div className={`mic-petals ${petalsFading ? "fading" : ""}`} aria-hidden>
          {(() => {
            const ease = (x: number) => Math.sqrt(x);
            const maxPetals = 22;
            const minPetals = 1;
            const count = Math.max(
              minPetals,
              Math.min(maxPetals, Math.round(ease(displayLevel) * maxPetals))
            );
            const petals: ReactElement[] = [];
            const radius = 52.5 + displayLevel * 55;
            const rand = (n: number) => {
              const x = Math.sin((n + petalSeed) * 12.9898) * 43758.5453;
              return x - Math.floor(x);
            };
            for (let i = 0; i < count; i++) {
              const baseAngle = (i / Math.max(1, count)) * Math.PI * 2;
              const jitter = (rand(i) - 0.5) * 0.8;
              const angle = baseAngle + jitter;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const size = 15 + rand(i + 1) * 22 + displayLevel * 12;
              const rotate = (rand(i + 2) - 0.5) * 120;
              const red = rand(i + 3) > 0.6;
              petals.push(
                <span
                  key={`p-${i}`}
                  className={`petal ${red ? "red" : "pink"}`}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`,
                    width: size,
                    height: size,
                    opacity: 0.55 + Math.min(0.45, displayLevel),
                  }}
                >
                  <img src={red ? sakuraDarkImg : sakuraImg} alt="" />
                </span>
              );
            }
            return petals;
          })()}
        </div>
      )}
    </button>
  );
}

export default MicButton;
