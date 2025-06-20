// "use client";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h3>Layout user</h3>
      {children}
    </>
  );
}
