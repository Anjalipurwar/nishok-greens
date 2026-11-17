import { mediaKind, fmtTime } from "./chat-helpers";

export interface ChatMessage {
  id: string;
  body?: string;
  direction: "inbound" | "outbound" | "system";
  status?: "pending" | "sent" | "failed";
  dateAdded?: string;
  attachments?: string[];
}

export function Bubble({ m }: { m: ChatMessage }) {
  const isOut = m.direction === "outbound";
  const isSys = m.direction === "system";
  if (isSys) {
    return (
      <div className="my-2 text-center">
        <span className="rounded-full bg-ivory/10 px-3 py-1 text-[11px] text-ivory/60">
          {m.body}
        </span>
      </div>
    );
  }
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isOut ? "rounded-br-md bg-gold text-forest" : "rounded-bl-md bg-ivory/10 text-ivory"
        } ${m.status === "pending" ? "opacity-60" : ""} ${
          m.status === "failed" ? "ring-1 ring-red-400/50" : ""
        }`}
      >
        {m.body && <p className="whitespace-pre-wrap break-words">{m.body}</p>}
        {m.attachments?.map((u) => {
          const k = mediaKind(u);
          if (k === "image")
            return <img key={u} src={u} alt="attachment" className="mt-1 max-h-40 rounded-lg" />;
          if (k === "video")
            return <video key={u} src={u} controls className="mt-1 max-h-40 rounded-lg" />;
          if (k === "audio") return <audio key={u} src={u} controls className="mt-1 w-full" />;
          return (
            <a
              key={u}
              href={u}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block truncate text-xs underline"
            >
              {u.split("/").pop()}
            </a>
          );
        })}
        <div className="mt-1 flex items-center gap-1.5">
          {m.dateAdded && (
            <span className={`text-[10px] ${isOut ? "text-forest/60" : "text-ivory/40"}`}>
              {fmtTime(m.dateAdded)}
            </span>
          )}
          {isOut && m.status === "pending" && <span className="text-[10px] text-forest/60">…</span>}
          {isOut && m.status === "failed" && (
            <span className="text-[10px] text-red-300">failed</span>
          )}
        </div>
      </div>
    </div>
  );
}

export interface Attachment {
  id: string;
  name: string;
  url?: string;
  status: "uploading" | "uploaded" | "failed";
  progress?: number;
  error?: string;
}

export function AttachmentChips({
  attachments,
  onRemove,
}: {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}) {
  if (!attachments.length) return null;
  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2">
      {attachments.map((a) => (
        <span
          key={a.id}
          className="flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-xs text-ivory"
        >
          <span className="max-w-[120px] truncate">{a.name}</span>
          {a.status === "uploading" && (
            <span className="text-gold">{Math.round((a.progress ?? 0) * 100)}%</span>
          )}
          {a.status === "failed" && <span className="text-red-300">failed</span>}
          <button
            type="button"
            onClick={() => onRemove(a.id)}
            className="text-ivory/50 hover:text-ivory"
            aria-label={`Remove ${a.name}`}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}
