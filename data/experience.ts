// Exact titles, companies and dates from Anushka_Jha_Resume.pdf.
// Newest first: recruiters scan top-down.

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  note?: string;
};

export const experience: TimelineItem[] = [
  {
    period: "Nov 2024 – May 2025",
    title: "Machine Learning Intern",
    org: "Fxis.AI",
    note: "LLM-based resume extraction, a SQL-driven job recommendation ranker, and WhatsApp candidate messaging through the Twilio API.",
  },
  {
    period: "May – Jun 2024",
    title: "Machine Learning Intern",
    org: "Prodigy InfoTech",
    note: "A CNN for hand-gesture recognition in PyTorch and OpenCV, integrated into the team’s gesture recognition app.",
  },
];

export const education: TimelineItem[] = [
  {
    period: "Aug 2025 – Now",
    title: "MS in Computer Science",
    org: "Arizona State University",
    note: "Expected Spring 2027",
  },
  {
    period: "Aug 2021 – May 2025",
    title: "B.Tech in Computer Science & Engineering",
    org: "SRM Institute of Science and Technology",
    note: "Specialization in Artificial Intelligence & Machine Learning",
  },
];
