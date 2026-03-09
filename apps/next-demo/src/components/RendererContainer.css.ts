import { style } from "@vanilla-extract/css";

export const panelHeader = style({
  margin: 0,
  fontSize: "1.45rem",
  fontWeight: 600,
});

export const rawDeltaOps = style({
  maxHeight: "100px",
  maxWidth: "100%",
  overflow: "scroll",
  background: "#1e293b",
  padding: "10px",
  borderRadius: "8px",
});

export const emptyRendererPanel = style({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
