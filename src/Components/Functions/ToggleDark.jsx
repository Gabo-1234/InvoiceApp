import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const root = document.getElementById("root");
    return root?.classList.contains("Dark-Bg") || false;
  });

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    if (isDark) {
      root.classList.remove("Light-Bg");
      root.classList.add("Dark-Bg");
    } else {
      root.classList.remove("Dark-Bg");
      root.classList.add("Light-Bg");
    }
  }, [isDark]);

  return { isDark, setIsDark };
};

export const ToggleDark = () => {
  const root = document.getElementById("root");
  if (!root) return;

  if (root.classList.contains("Light-Bg")) {
    root.classList.remove("Light-Bg");
    root.classList.add("Dark-Bg");
  } else {
    root.classList.remove("Dark-Bg");
    root.classList.add("Light-Bg");
  }
};