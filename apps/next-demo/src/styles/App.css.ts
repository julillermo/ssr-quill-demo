import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
});

globalStyle("#root", {
  minHeight: "100vh",
  width: "100vw",
  margin: 0,
  fontFamily: "Inter, system-ui, sans-serif",
  backgroundColor: "#020617",
  color: "#e2e8f0",
});

export const shell = style({
  width: "100%",
  minHeight: "100vh",
  borderRadius: "0",
  background: "#0f172a",
  padding: "1.5rem",
  display: "flex",
  gap: "1.5rem",
  boxShadow: "0 20px 60px rgba(2, 6, 23, 0.65)",
  border: "none",
});

export const sidePanel = style({
  borderRadius: "16px",
  padding: "1.25rem",
  background: "linear-gradient(180deg, #1e293b, #111827)",
  border: "1px solid rgba(226, 232, 240, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: 1,
  minWidth: 0,
});

export const mainPanel = style({
  borderRadius: "16px",
  padding: "1.5rem",
  background: "#020617",
  border: "1px solid rgba(148, 163, 184, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  flex: 1,
  minWidth: 0,
});
