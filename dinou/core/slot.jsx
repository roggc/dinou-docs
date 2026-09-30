"use client";

import React from "react";

const createContext = React.createContext;
const useContext = React.useContext;
const use = React.use;
const createElement = React.createElement;
const Component = typeof React.Component === "function" ? React.Component : class {};

export const DinouPageContext = typeof createContext === "function" ? createContext(null) : null;

class SlotErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[Dinou] Page Error caught in Slot:", error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.pagePromise !== this.props.pagePromise) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV !== "production";
      return createElement(
        "div",
        { style: { padding: "24px", fontFamily: "system-ui, -apple-system, sans-serif" } },
        createElement("h2", { style: { color: "#e11d48", margin: "0 0 12px 0" } }, "Page Error"),
        createElement("p", { style: { color: "#64748b", margin: "0 0 16px 0" } }, "An unhandled error occurred inside this page component."),
        createElement(
          "pre",
          {
            style: {
              backgroundColor: "#0f172a",
              color: "#f8fafc",
              padding: "16px",
              borderRadius: "8px",
              overflowX: "auto",
              fontSize: "0.85rem",
              lineHeight: 1.5,
            },
          },
          isDev
            ? `${this.state.error?.name || "Error"}: ${this.state.error?.message || String(this.state.error)}\n${this.state.error?.stack || ""}`
            : this.state.error?.message || String(this.state.error)
        )
      );
    }
    return this.props.children;
  }
}

function PageConsumer({ pagePromise }) {
  return use ? use(pagePromise) : pagePromise;
}

export function DinouPageSlot() {
  if (typeof useContext !== "function" || !DinouPageContext) {
    return null;
  }
  const pagePromise = useContext(DinouPageContext);
  if (!pagePromise) {
    return null;
  }
  return createElement(
    SlotErrorBoundary,
    { pagePromise },
    createElement(PageConsumer, { pagePromise })
  );
}

export default DinouPageSlot;
