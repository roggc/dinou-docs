"use client";

import type { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  sidebar2,
  title,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  sidebar2: ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <title>{title ?? "react 19 app"}</title>
      </head>
      <body>
        {sidebar}
        {sidebar2}
        {children}
      </body>
    </html>
  );
}
