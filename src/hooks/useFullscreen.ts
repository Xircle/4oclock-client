import { useRef } from "react";

export default function useFullscreen() {
  const element = useRef<HTMLImageElement | null>(null);
  const triggerFull = () => {
    if (element?.current) {
      element?.current.requestFullscreen();
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
  };
  return { element, triggerFull, exitFull };
}
