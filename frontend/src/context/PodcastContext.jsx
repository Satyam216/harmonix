import { createContext, useContext, useState } from "react";

const PodcastContext = createContext();

export function PodcastProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);

  const playPodcast = (podcast) => {
    setCurrent(podcast);
    setOpen(true);
  };

  const closePodcast = () => {
    setOpen(false);
    setCurrent(null);
  };

  return (
    <PodcastContext.Provider
      value={{ current, open, playPodcast, closePodcast }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

export const usePodcast = () => useContext(PodcastContext);
