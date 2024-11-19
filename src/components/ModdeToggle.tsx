"use client";
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';
import { useTheme } from "./theme-provider";

export default function ModdeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-md p-2 hover:bg-main-blue  dark:hover:bg-dark-brown"
    >
      {theme === "dark" ? (
        <Sun size={25} className='' />
      ) : (
        <Moon size={25} color="blue" />
      )}
    </button>
  );
}

