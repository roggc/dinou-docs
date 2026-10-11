"use client";

import * as React from "react";
import { TableRow } from "@/docs/components/ui/table";

export interface ClickableTableRowProps extends React.ComponentProps<typeof TableRow> {
  targetId?: string;
}

export function ClickableTableRow({
  targetId,
  className,
  children,
  onClick,
  ...props
}: ClickableTableRowProps) {
  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      } else {
        window.location.hash = targetId;
      }
    }
  };

  return (
    <TableRow onClick={handleClick} className={className} {...props}>
      {children}
    </TableRow>
  );
}
