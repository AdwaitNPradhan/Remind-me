const Vids_List = [
  'https://assets.mixkit.co/videos/preview/mixkit-leaves-under-a-blue-sky-1185-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-sunset-in-the-distance-walking-through-the-city-40741-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-black-and-white-ink-underwater-487-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-boardwalk-with-umbrellas-1165-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-flipping-through-a-wad-of-dollars-seen-very-close-18304-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-red-flames-burning-at-night-3765-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-bubbles-rising-in-water-178-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-pink-and-yellow-powder-jumping-677-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-blue-eye-46741-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-light-posts-1598-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-raft-going-slowly-down-a-river-1218-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-slowly-approaching-a-clock-on-a-black-background-28897-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-view-of-the-horizon-in-the-sea-while-a-sailboat-4477-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-at-a-calm-lake-time-lapse-1704-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-burning-lava-particles-leaping-through-the-air-4426-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-tunnel-of-black-cubes-in-3d-31497-large.mp4',
];

export const GetVid = () => {
  return Vids_List[Math.floor(Math.random() * Vids_List.length)];
};
