// Presentation copy for the native chat widget. The core owns record lines
// (welcome, feedback, form, out-of-hours, chat-ended); these are site chrome only.

export const CHAT_COPY = {
  launcher: {
    ariaLabel: "Open live chat",
  },
  panel: {
    title: "Nishok Greens",
    subtitle: "Breathe · Bloom · Belong",
    placeholder: "Type your message…",
    closeLabel: "Close chat",
  },
  loading: "Connecting you to Nishok Greens…",
  retry: "Retry",
  // Status / connection wording (shown only while reconnecting/offline)
  reconnecting: "Reconnecting…",
  offline: "You're offline — waiting for connection.",
  // History
  loadOlder: "Load earlier messages",
  historyLoading: "Loading…",
  // Composer
  attachLabel: "Attach a file",
  sendLabel: "Send",
  // Form
  submitForm: "Start chat",
  consentAgree: "I agree",
  // Feedback
  feedbackThanks: "Thank you — your feedback helps us serve you better.",
  restartChat: "Start a new chat",
  // Email chat thank-you
  emailThankYou: "Thanks — we'll be in touch shortly.",
  // Quick replies (shown before first message)
  quickReplies: ["Request the brochure", "Book a site visit", "Plot pricing & availability"],
};
