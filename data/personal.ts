// "When I’m not building things" — clickable cards, each opening a detail panel.
//
// Copy is Anushka’s own (supplied Oct 2026).
// Every panel ends with exactly two `details` (label + value), rendered by one
// shared component so all six panels look the same.
//
// Photos: put files in /public/images/personal/ and list them under `images`.
// The first image also becomes the card’s background. Until then, `photoSlots`
// reserves space (dev only).

export type InterestIcon = "dumbbell" | "bowl" | "flag" | "paw" | "plane" | "tv";

export type InterestDetail = { label: string; value: string };

export type Interest = {
  id: string;
  icon: InterestIcon;
  title: string;
  teaser: string;
  body: string[];
  /** Exactly two personality details shown at the bottom of the panel. */
  details: [InterestDetail, InterestDetail];
  images?: { src: string; alt: string }[];
  photoSlots?: number;
  tint: [string, string];
};

export const personal = {
  enabled: true,
  intro: "What else? I love deeply. I get attached to everyone and everything in my life, and honestly, it’s exhilarating.",
  interests: [
    {
      id: "move",
      icon: "dumbbell",
      title: "Gym, then a run",
      teaser: "If I’m not working, there’s a good chance I’m moving.",
      body: [
        "The gym is my reset button. I love strength training, and somehow I’ve also become someone who voluntarily goes for runs.",
        "Some days it’s about pushing myself, some days it’s just about clearing my head — either way, moving makes everything feel a little better.",
      ],
      details: [
        { label: "Reset button", value: "A good workout" },
        { label: "Current challenge", value: "Becoming a better runner" },
      ],
      photoSlots: 3,
      tint: ["#1e0b0f", "#430f1b"],
    },
    {
      id: "cook",
      icon: "bowl",
      title: "Cooking is my love language",
      teaser: "Experiments happen outside the codebase too.",
      body: [
        "I love cooking, but following a recipe exactly? Not really my thing.",
        "I’m always experimenting — changing ingredients, trying something new, and occasionally creating something I have absolutely no idea how to recreate.",
        "More than anything, I love cooking for the people I care about. A homemade meal is probably my favorite way of saying, “I love you.”",
      ],
      details: [
        { label: "Love language", value: "Cooking for my people" },
        { label: "In the kitchen", value: "Always experimenting" },
      ],
      photoSlots: 3,
      tint: ["#1e160b", "#43290f"],
    },
    {
      id: "dogs",
      icon: "paw",
      title: "Yes, I want to pet your dog",
      teaser: "Every dog. No exceptions.",
      body: [
        "I am very easily distracted by dogs.",
        "Big dogs, tiny dogs, fluffy dogs, dogs with absolutely no concept of personal space — I love them all.",
        "If we’re walking somewhere together and I suddenly disappear, there is a very good chance I found a dog.",
      ],
      details: [
        { label: "Biggest distraction", value: "A dog across the street" },
        { label: "Petting policy", value: "Every dog. No exceptions." },
      ],
      photoSlots: 3,
      tint: ["#0b1a1e", "#0f3943"],
    },
    {
      id: "f1",
      icon: "flag",
      title: "Lights out & away we go",
      teaser: "My weekends occasionally run at 200 mph.",
      body: [
        "I love Formula 1 — the racing, the strategy, the engineering, the rivalries, and the tiny decisions that can completely change a race.",
        "There’s something fascinating about watching hundreds of people obsess over milliseconds.",
        "Race weekend plans? Consider them booked.",
      ],
      details: [
        { label: "Race weekend", value: "Do not disturb" },
        { label: "Favorite part", value: "Strategy, speed & engineering" },
      ],
      photoSlots: 3,
      tint: ["#1e0b0b", "#43150f"],
    },
    {
      id: "trip",
      icon: "plane",
      title: "Table for one, please",
      teaser: "Currently plotting my first solo adventure.",
      body: [
        "I really want to take a solo trip.",
        "There’s something exciting — and slightly terrifying — about going somewhere completely on your own, figuring things out as you go, and experiencing a new place entirely at your own pace.",
      ],
      details: [
        { label: "Destination", value: "Still deciding" },
        { label: "The plan", value: "Go anyway." },
      ],
      photoSlots: 3,
      tint: ["#0b101e", "#0f1d43"],
    },
    {
      id: "screen",
      icon: "tv",
      title: "Stories on a screen",
      teaser: "Give me a heartwarming story and a blanket.",
      body: [
        "I love getting completely lost in a good movie or series. Give me something heartwarming, a cozy blanket, and a bowl of popcorn, and I’m probably not moving for the next few hours.",
        "Movies and series speak to me on an artistic level — the storytelling, cinematography, characters, music, and all the little details that make you feel something.",
        "I love stories that stay with me long after the credits roll.",
      ],
      details: [
        { label: "Ideal setup", value: "Blanket + popcorn" },
        { label: "Biggest weakness", value: "“Just one more episode”" },
      ],
      photoSlots: 3,
      tint: ["#110b1e", "#200f43"],
    },
  ] satisfies Interest[],
};
