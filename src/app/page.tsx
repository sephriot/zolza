"use client";
import Image from "next/image";
import AnimalLabLogo from "./images/AnimalLab.png";
import Main from "./main";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Main />
      </div>
      <div className="relative flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert cursor-pointer"
          src={AnimalLabLogo}
          alt="AnimalLab Logo"
          width={180}
          height={40}
          priority
          onClick={() => location.reload()}
          unoptimized
        />
      </div>
    </main>
  );
}
