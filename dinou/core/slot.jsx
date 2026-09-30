"use client";

import React from "react";

const createContext = React.createContext;
const useContext = React.useContext;
const use = React.use;

export const DinouPageContext = typeof createContext === "function" ? createContext(null) : null;

export function DinouPageSlot() {
  if (typeof useContext !== "function" || !DinouPageContext) {
    return null;
  }
  const pagePromise = useContext(DinouPageContext);
  if (!pagePromise) {
    return null;
  }
  return use(pagePromise);
}

export default DinouPageSlot;
