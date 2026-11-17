import { useEffect, useRef, useState } from "react";
import { CHAT_WIDGET_CONFIG } from "@/lib/chat-widget-config";
import { CHAT_COPY as C } from "@/lib/chat-widget-copy";
import { LOGO_IMG } from "@/components/nishok/data";
import { ContactForm } from "./ContactForm";
import { Bubble, AttachmentChips, type ChatMessage } from "./ChatParts";

/* Core loader — cached, runtime import, never vendored */
let corePromise: Promise<any> | null = null;
const loadChatCore = (url: string) => (corePromise ??= import(/* @vite-ignore */ url));

export function ChatWidget() {
  const [state, setState] = useState<any>({});
  const [text, setText] = useState("");
  const [client, setClient] = useState<any>(null);
  const [openIntent, setOpenIntent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<any>(null);

  /* create client + subscribe */
  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const core = await loadChatCore(CHAT_WIDGET_CONFIG.coreUrl);
        const createChatClient = core.createChatClient ?? core.default?.createChatClient;
        const chat = createChatClient({
          locationId: CHAT_WIDGET_CONFIG.locationId,
          widgetId: CHAT_WIDGET_CONFIG.chatWidgetId,
          marketplaceUrl: CHAT_WIDGET_CONFIG.marketplaceUrl,
          source: CHAT_WIDGET_CONFIG.source,
        });
        if (cancelled) return;
        chatRef.current = chat;
        setClient(chat);
        unsub = chat.subscribe((s: any) => setState(s));
      } catch (err) {
        setState((s: any) => ({
          ...s,
          error: { message: (err as Error)?.message || "Unable to load chat." },
        }));
      }
    })();
    return () => {
      cancelled = true;
      try {
        unsub?.();
      } catch {}
      try {
        chatRef.current?.close?.();
      } catch {}
    };
  }, []);

  /* open when intent + client ready */
  useEffect(() => {
    if (openIntent && client) {
      (async () => {
        try {
          client.setPanelOpen(true);
          await client.open();
        } catch (err) {
          setState((s: any) => ({
            ...s,
            error: { message: (err as Error)?.message || "Failed to open chat." },
          }));
        }
      })();
    }
  }, [openIntent, client]);

  /* captcha anchor once panel mounts */
  useEffect(() => {
    if (client && panelRef.current && state.isOpen) {
      try {
        client.setCaptchaAnchor(panelRef.current);
      } catch {}
    }
  }, [client, state.isOpen]);

  /* autoscroll on new messages */
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.messages, state.agentTyping]);

  /* prefetch on idle */
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => loadChatCore(CHAT_WIDGET_CONFIG.coreUrl));
    }
  }, []);

  const isOpen = !!state.isOpen;
  const cfg = state.config;
  const liveChat = cfg?.liveChat ?? {};
  const attachCfg = liveChat.attachments ?? {};
  const fields = cfg?.contactForm?.fields ?? [];

  const openPanel = () => setOpenIntent(true);
  const closePanel = () => {
    try {
      client?.setPanelOpen?.(false);
    } catch {}
  };

  const send = async () => {
    const uploading = state.attachments?.some((a: any) => a.status === "uploading");
    const ready = (state.attachments ?? [])
      .filter((a: any) => a.status === "uploaded")
      .map((a: any) => a.url!);
    if (state.canSend && !uploading && (text.trim() || ready.length)) {
      const t = text;
      setText("");
      await client.sendMessage({ text: t, attachments: ready });
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    for (const f of files) {
      try {
        await client.uploadAttachment(f);
      } catch {}
    }
  };

  const sendQuickReply = (q: string) => {
    (async () => {
      if (state.canSend) {
        await client.sendMessage({ text: q, attachments: [] });
      }
    })();
  };

  const showLauncher = !isOpen;
  const unread = state.unreadCount ?? 0;

  return (
    <>
      {showLauncher && (
        <button
          onClick={openPanel}
          aria-label={C.launcher.ariaLabel}
          className="chat-launcher fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-forest text-gold shadow-2xl ring-2 ring-gold/60 transition-all duration-300 hover:scale-105 hover:ring-gold overflow-hidden p-1.5"
          style={{ backgroundColor: "#0E3B2E" }}
        >
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-forest-soft/40 border border-gold/40">
            <img
              src={LOGO_IMG}
              alt="Nishok Greens Logo"
              className="h-9 w-9 object-contain drop-shadow"
            />
            {/* Tiny gold chat bubble icon badge */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-forest shadow">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
          </div>
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-forest">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div
          ref={panelRef}
          className="chat-panel fixed bottom-6 right-6 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-forest text-ivory shadow-2xl"
          style={{ height: "min(640px, calc(100dvh - 7rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ivory/10 bg-forest-soft/30 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 p-1 ring-1 ring-gold/40">
                <img src={LOGO_IMG} alt="Nishok Greens" className="h-7 w-7 object-contain" />
              </div>
              <div>
                <div className="font-display text-base font-semibold leading-tight">
                  {C.panel.title}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-subtle-pulse" />
                  {C.panel.subtitle}
                </div>
              </div>
            </div>
            <button
              onClick={closePanel}
              aria-label={C.panel.closeLabel}
              className="rounded-full p-1.5 text-ivory/60 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          {!cfg ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              {state.error ? (
                <>
                  <p className="text-sm text-ivory/80">{state.error.message}</p>
                  <button
                    onClick={() => client?.open?.()}
                    className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-forest hover:bg-gold-soft"
                  >
                    {C.retry}
                  </button>
                </>
              ) : (
                <>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-ivory/20 border-t-gold" />
                  <p className="text-sm text-ivory/70">{C.loading}</p>
                </>
              )}
            </div>
          ) : state.awaitingChatTypeSelection ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="font-display text-lg text-ivory">How would you like to chat?</p>
              <button
                onClick={() => client.setActiveChatType("liveChat")}
                className="w-full rounded-full bg-gold px-5 py-3 text-sm font-semibold text-forest hover:bg-gold-soft"
              >
                Live Chat
              </button>
              <button
                onClick={() => client.setActiveChatType("emailChat")}
                className="w-full rounded-full border border-ivory/30 px-5 py-3 text-sm font-semibold text-ivory hover:border-gold hover:text-gold"
              >
                SMS / Email
              </button>
            </div>
          ) : state.activeChatType === "emailChat" ? (
            state.contactFormSubmitted ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="font-display text-lg text-ivory">{C.emailThankYou}</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <ContactForm fields={fields} chat={client} state={state} />
              </div>
            )
          ) : state.activeChatType === "liveChat" ? (
            <>
              {/* Transcript */}
              <div ref={threadRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-4">
                {state.hasMoreHistory && (
                  <div className="mb-3 text-center">
                    <button
                      onClick={() => client.loadOlderMessages?.()}
                      disabled={state.historyLoading}
                      className="rounded-full bg-ivory/10 px-4 py-1.5 text-xs text-ivory hover:bg-ivory/20 disabled:opacity-50"
                    >
                      {state.historyLoading ? C.historyLoading : C.loadOlder}
                    </button>
                  </div>
                )}
                {(state.messages ?? []).map((m: ChatMessage) => (
                  <Bubble key={m.id} m={m} />
                ))}
                {state.agentTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl rounded-bl-md bg-ivory/10 px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ivory/50 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ivory/50 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ivory/50" />
                    </div>
                  </div>
                )}

                {/* Quick replies before first visitor message */}
                {(state.messages ?? []).length === 0 && C.quickReplies.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {C.quickReplies.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendQuickReply(q)}
                        disabled={!state.canSend}
                        className="rounded-full border border-gold/40 px-4 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Status line */}
              {state.connection === "reconnecting" && (
                <p className="px-4 py-1 text-center text-[11px] text-ivory/50">{C.reconnecting}</p>
              )}
              {state.connection === "offline" && (
                <p className="px-4 py-1 text-center text-[11px] text-ivory/50">{C.offline}</p>
              )}

              {/* Cards — unmount composer while pending */}
              {state.showContactForm ? (
                <ContactForm fields={fields} chat={client} state={state} />
              ) : state.feedbackRequested ? (
                <div className="flex flex-col items-center gap-3 border-t border-ivory/10 p-4 text-center">
                  <p className="text-sm text-ivory/80">
                    {state.config?.liveChat?.feedbackMessage ?? "How did we do?"}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => client.sendFeedback("positive")}
                      className="rounded-full bg-ivory/10 p-3 text-ivory hover:bg-gold hover:text-forest"
                      aria-label="Positive"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => client.sendFeedback("negative")}
                      className="rounded-full bg-ivory/10 p-3 text-ivory hover:bg-gold hover:text-forest"
                      aria-label="Negative"
                    >
                      👎
                    </button>
                  </div>
                </div>
              ) : state.feedbackSubmitted ? (
                <div className="flex flex-col items-center gap-3 border-t border-ivory/10 p-4 text-center">
                  <p className="text-sm text-ivory/80">
                    {state.config?.liveChat?.feedbackNote ?? C.feedbackThanks}
                  </p>
                  <button
                    onClick={() => client.restartConversation?.()}
                    className="rounded-full border border-gold/40 px-5 py-2 text-xs font-semibold text-gold hover:bg-gold/10"
                  >
                    {C.restartChat}
                  </button>
                </div>
              ) : state.ended ? (
                <div className="flex flex-col items-center gap-3 border-t border-ivory/10 p-4 text-center">
                  <button
                    onClick={() => client.restartConversation?.()}
                    className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-forest hover:bg-gold-soft"
                  >
                    {C.restartChat}
                  </button>
                </div>
              ) : (
                /* Composer */
                <>
                  <AttachmentChips
                    attachments={state.attachments ?? []}
                    onRemove={(id) => client?.removeAttachment?.(id)}
                  />
                  <div className="flex items-end gap-2 border-t border-ivory/10 p-3">
                    {attachCfg.enabled && (
                      <>
                        <button
                          onClick={() => fileRef.current?.click()}
                          disabled={(state.attachments?.length ?? 0) >= (attachCfg.maxFiles ?? 1)}
                          aria-label={C.attachLabel}
                          className="shrink-0 rounded-full p-2 text-ivory/60 transition-colors hover:bg-ivory/10 hover:text-gold disabled:opacity-40"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                          >
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                        </button>
                        <input
                          ref={fileRef}
                          type="file"
                          multiple
                          accept={attachCfg.acceptedTypes?.join(",") ?? "*/*"}
                          onChange={onFile}
                          className="hidden"
                        />
                      </>
                    )}
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      placeholder={C.panel.placeholder}
                      rows={1}
                      className="max-h-28 flex-1 resize-none rounded-2xl border border-ivory/20 bg-ivory/5 px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold/60"
                    />
                    <button
                      onClick={send}
                      disabled={!state.canSend || state.captchaRequired}
                      aria-label={C.sendLabel}
                      className="shrink-0 rounded-full bg-gold p-2.5 text-forest transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                    </button>
                  </div>
                  {state.captchaRequired && state.captchaStatusMessage && (
                    <p className="px-4 pb-2 text-center text-[11px] text-gold">
                      {state.captchaStatusMessage}
                    </p>
                  )}
                  {state.error && !state.error.field && (
                    <p className="px-4 pb-2 text-center text-[11px] text-red-300">
                      {state.error.message}
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-ivory/60">
              This chat type is not supported.
            </div>
          )}
        </div>
      )}
    </>
  );
}
