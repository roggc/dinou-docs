"use client";

import dinou from "@/images/dinou.png";
import ModeToggle from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="bg-blue-100 text-black dark:bg-black dark:text-white p-4 flex items-center justify-between">
      <a href="/">
        <img src={dinou} className="w-10" />
      </a>
      <ModeToggle />
    </header>
  );
}
