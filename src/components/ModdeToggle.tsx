"use client";
import { useTheme } from "next-themes";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export default function ModdeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mt-10 flex gap-10 rounded-md border p-1 text-4xl">
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <IoSunnySharp size={30} />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <IoMoonSharp size={30} />
        </button>
      )}
    </div>
  );
}
