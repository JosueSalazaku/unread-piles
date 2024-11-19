"use client";
import { useTheme } from "next-themes";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

export default function ModdeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mt-10 flex rounded-md border">
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>
          <IoSunnySharp size={25} />
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <IoMoonSharp size={25} />
        </button>
      )}
    </div>
  );
}
