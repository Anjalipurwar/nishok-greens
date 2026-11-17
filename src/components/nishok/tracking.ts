// Form tracking helper for Nishok Greens enquiry form.
// Fire-and-forget CRM event posted alongside the WhatsApp redirect.

type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

export const TRACKING_ID = "tk_febc02033b094d2cbb3b3f828f02a460";
export const TRACKING_LOCATION_ID = "aB3mlIGat7YaB7i1rvqA";
export const TRACKING_PROJECT_ID = "1794898566262339781";
export const INTEREST_CUSTOM_FIELD_ID = "xfvFJHm1ujjHQS5OMTj6";

const TRACKING_ENDPOINT = "https://backend.leadconnectorhq.com/external-tracking/events";

export const postTrackingEvent = (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: {
      version: "2021-07-28",
    },
    body,
  }).catch(() => {});
};

export const getTrackingSessionId = () => {
  try {
    const sid = document.cookie.match(/(?:^|;\s*)__vibe_sid=([0-9a-f-]{36})(?:;|$)/)?.[1];
    if (sid) return sid;
  } catch {}
  return crypto.randomUUID();
};

export type EnquiryFormValues = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

export function trackEnquiry(values: EnquiryFormValues) {
  const trackingPayload = {
    type: "external_form_submission",
    timestamp: Date.now(),
    formId: "nishok-greens-enquiry",
    formData: {
      first_name: values.name,
      phone: values.phone,
      email: values.email,
      calendar_notes: values.message,
    },
    formLabels: {
      first_name: "Full Name",
      phone: "Phone",
      email: "Email",
      calendar_notes: "Message",
    },
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    trackingId: TRACKING_ID,
    locationId: TRACKING_LOCATION_ID,
    projectId: TRACKING_PROJECT_ID,
    sessionId: getTrackingSessionId(),
    properties: {
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
      source: "ai_studio",
      projectId: TRACKING_PROJECT_ID,
      formName: "Nishok Greens Enquiry",
    },
  };

  postTrackingEvent(trackingPayload, {
    customFields: {
      [INTEREST_CUSTOM_FIELD_ID]: {
        value: values.interest,
        label: "Interest",
      },
    },
  });
}
