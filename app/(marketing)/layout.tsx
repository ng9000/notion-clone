import React from "react";
import NavBar from "./_components/NavBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <NavBar />

      <main className="h-full pt-32">{children}</main>
    </div>
  );
};

export default layout;
