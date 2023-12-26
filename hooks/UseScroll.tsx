"use client";
import { useEffect, useState } from "react";

export const useScroll = (threshhold = 10) => {
  const [scrolled, setscrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > threshhold) {
      setscrolled(true);
    } else {
      setscrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return window.removeEventListener("scroll", handleScroll);
  }, [threshhold]);

  return scrolled;
};
