"use client";

import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { useTheme } from "./theme-provider";

export default function ModdeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-md border"
    >
      {theme === "dark" ? (
        <IoSunnySharp size={25} />
      ) : (
        <IoMoonSharp size={25} />
      )}
    </button>
  );
}
