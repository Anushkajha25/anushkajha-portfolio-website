// Real CASIA-B silhouette frames for the gait artwork.
//
// Drop PNGs into /public/images/casia/ and list them here. The homepage card
// shows 2 or 3 real frames (add a Normal frame first to get all three
// conditions); the case-study cover switches to real frames once there are 8.
// Current frames: bag and coat examples Anushka supplied. Swap in frames from
// your own copy of the dataset when you can.

export type GaitFrame = { src: string; alt: string; condition?: "Normal" | "Bag" | "Coat" };

export const casiaFrames: GaitFrame[] = [
  { src: "/images/casia/casia-b-bag.png", alt: "CASIA-B silhouette of a person walking while carrying a bag", condition: "Bag" },
  { src: "/images/casia/casia-b-coat.png", alt: "CASIA-B silhouette of a person walking in a coat", condition: "Coat" },
];

