export type Mode = "textSpeak" | "speakOnly";
export type Role = "user" | "assistant";

export type Message = {
  id: string;
  role: Role;
  text: string;
};

