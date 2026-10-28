// [CONTENT NEEDED] blocks are loud in development and hidden in production,
// so a deploy never shows unfinished copy to a recruiter.
// Force either way with NEXT_PUBLIC_SHOW_PLACEHOLDERS=true|false.
const flag = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS;

export const SHOW_PLACEHOLDERS = flag ? flag === "true" : process.env.NODE_ENV !== "production";

export const isPlaceholder = (text?: string) => !!text && text.includes("[CONTENT NEEDED]");
