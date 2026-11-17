import {
  Leaf,
  Flower2,
  HeartHandshake,
  TreePine,
  FileText,
  Sparkles,
  Building2,
  Compass,
  Phone,
  ShieldCheck,
  Award,
  Users,
  Clock,
  Waves,
  DoorOpen,
  Home,
  Sun,
  Coffee,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP_NUMBER = "916262585888";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const LOGO_IMG =
  "https://vibe.filesafe.space/1793706552293379180/attachments/6e69955e-3811-474a-862a-8e78704a955f.png";

export const HERO_IMG =
  "https://vibe.filesafe.space/1793706552293379180/attachments/71fc734b-4d6a-4943-9fd9-05cafb545332.png";

export const HERO_VIDEO = "https://d.uguu.se/nAqWVHEDwxHW.mp4";

export const DETAILS_VIDEO = "https://d.uguu.se/akLDqcjkaTGN.mp4";

export const WAINGANGA_VIDEO = "https://n.uguu.se/FucaNgZoRvJg.mp4";

export const AERIAL_VIEW_VIDEO = "https://h.uguu.se/KqvyJHxLbxvd.mp4";
export const AERIAL_VIEW_POSTER = "https://n.uguu.se/xyewjHZEDrkd.jpg";

export const WALKTHROUGH_VIDEO = "https://h.uguu.se/VfFyBjfgqFsi.mp4";
export const WALKTHROUGH_POSTER = "https://d.uguu.se/VmYLyXByDJMe.jpg";

export const BROCHURE_IMG =
  "https://vibe.filesafe.space/1793706552293379180/attachments/71fc734b-4d6a-4943-9fd9-05cafb545332.png";

export const BROCHURE_LINK =
  "https://drive.google.com/file/d/13SIDjbtOJ7eAQ5NJFXzs_ufWl7ufG1Vc/view";

export const GALLERY = {
  river:
    "https://vibe.filesafe.space/1794898566262339781/assets/0f17d9aa-e44c-4894-84cf-25f5e481df20.png",
  pool: "https://vibe.filesafe.space/1794898566262339781/assets/76ae4e7a-f9e8-4a9c-baec-5a29c2703a8c.png",
  yoga: "https://vibe.filesafe.space/1794898566262339781/assets/916b0944-33d5-45db-b1c9-b26ad1ad65f8.png",
  temple:
    "https://vibe.filesafe.space/1794898566262339781/assets/c05ab5bf-9282-4e8b-bb02-eafbd1929d34.png",
  valley:
    "https://vibe.filesafe.space/1794898566262339781/assets/8f76f259-c0df-42f0-98e7-1eb664b3bf6e.png",
};

export type IconItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
};

export const PHILOSOPHY_CARDS = [
  {
    icon: Leaf,
    word: "Breathe",
    text: "Wake to river mist and the hush of ancient trees. Air filtered by a thousand leaves — your lungs, finally at home.",
  },
  {
    icon: Flower2,
    word: "Bloom",
    text: "Gardens that change with the seasons, a clubhouse that gathers community. A place where every life flourishes.",
  },
  {
    icon: HeartHandshake,
    word: "Belong",
    text: "Sixty families. One shared rhythm. Not just an address — a community woven by intention and rooted in belonging.",
  },
];

export const DETAIL_ITEMS: IconItem[] = [
  {
    icon: TreePine,
    title: "60 Plots Only",
    text: "An intimate, low-density community — limited, considered, exclusive.",
    href: "#contact",
  },
  {
    icon: FileText,
    title: "Single Title",
    text: "Clear, consolidated land ownership for complete peace of mind.",
    href: "#faq",
  },
  {
    icon: Sparkles,
    title: "Pre-Launch",
    text: "Be among the first to claim your place at founder pricing.",
    href: "#contact",
  },
  {
    icon: ShieldCheck,
    title: "RERA P-BGT-XX-XXXX",
    text: "Registration in final process — full transparency assured.",
    href: "#faq",
  },
  {
    icon: Building2,
    title: "By CZRD Ventures",
    text: "Developed by a team committed to thoughtful, lasting communities.",
    href: "#why",
  },
  {
    icon: Compass,
    title: "Architect: KDBY Mumbai",
    text: "Design language shaped by one of India's discerning studios.",
    href: "#gallery",
  },
  {
    icon: MapPin,
    title: "Village Garra, Balaghat",
    text: "On the Balaghat–Jabalpur Highway, beside the Wainganga River.",
    href: "#location",
  },
  {
    icon: Phone,
    title: "+91 62625 85888",
    text: "Speak with our team directly — we're happy to walk you through.",
    href: WHATSAPP_LINK,
    external: true,
  },
  {
    icon: Award,
    title: "Curated Amenities",
    text: "Entry gate, clubhouse, pool, yoga deck, cafeteria & temple.",
    href: "#gallery",
  },
];

import { MapPin } from "lucide-react";

export const WHY_CARDS: IconItem[] = [
  {
    icon: Waves,
    title: "Riverside Setting",
    text: "Life beside the Wainganga — a river that has shaped this land for centuries.",
  },
  {
    icon: Users,
    title: "Limited to 60",
    text: "Exclusivity by design. A community small enough to know everyone.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Title & RERA",
    text: "Single title ownership with RERA registration in final process.",
  },
  {
    icon: Award,
    title: "Mumbai-Calibre Design",
    text: "Master-planned by KDBY, Mumbai — design pedigree you can feel.",
  },
  {
    icon: Clock,
    title: "Pre-Launch Advantage",
    text: "Founder pricing and first pick of plots, available now.",
  },
];

export const TESTIMONIALS = [
  {
    text: "The moment I stood by the river, I knew this was where my family would grow. Nishok Greens feels like a return to something real.",
    name: "Aditya & Meera Sharma",
    role: "Early Investor, Nagpur",
  },
  {
    text: "Sixty plots means sixty families who chose deliberately. That intention is what makes this community different from anything else around.",
    name: "Rajesh Kulkarni",
    role: "Architect & Future Resident",
  },
  {
    text: "From the master plan to the temple, every detail has been considered with care. CZRD Ventures is building something that will last generations.",
    name: "Dr. Priya Deshmukh",
    role: "Booking Holder, Jabalpur",
  },
];

export const FAQS = [
  {
    q: "What is Nishok Greens?",
    a: "Nishok Greens is a pre-launch, 60-plot lifestyle community at Village Garra on the Balaghat–Jabalpur Highway, beside the Wainganga River — developed by CZRD Ventures.",
  },
  {
    q: "How many plots are available?",
    a: "Only 60 plots. The community is intentionally low-density and intimate, designed for a limited number of families.",
  },
  {
    q: "What is the title status?",
    a: "The land is held under a Single Title for clear, consolidated ownership, giving buyers complete peace of mind.",
  },
  {
    q: "Is the project RERA registered?",
    a: "RERA registration (P-BGT-XX-XXXX) is in the final process. Full details will be shared upon registration and on request.",
  },
  {
    q: "What amenities are included?",
    a: "An entry gate, clubhouse, swimming pool, yoga deck, cafeteria and temple — all woven into the landscaped master plan.",
  },
  {
    q: "Who is the architect?",
    a: "The master plan and design language are shaped by KDBY, Mumbai, a studio known for considered, refined design.",
  },
  {
    q: "How do I book a site visit?",
    a: "Use the contact form below, message us on WhatsApp at +91 62625 85888, or call directly. We'll arrange a guided visit at your convenience.",
  },
  {
    q: "Can I get the brochure before visiting?",
    a: "Yes — share your details in the contact section and we'll send the full brochure with master plan, layouts and pricing.",
  },
];

export const AMENITIES = [
  { icon: DoorOpen, label: "Entry Gate" },
  { icon: Home, label: "Club House" },
  { icon: Waves, label: "Pool" },
  { icon: Sun, label: "Yoga Deck" },
  { icon: Coffee, label: "Cafeteria" },
  { icon: Landmark, label: "Temple" },
];
