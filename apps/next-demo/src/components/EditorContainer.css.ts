import { style } from "@vanilla-extract/css";

export const panelHeaderContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  justifyContent: "space-between",
  alignItems: "center",
});

export const panelHeaderContainerRight = style({
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
  justifyContent: "space-between",
  selectors: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const panelHeaderTitle = style({
  margin: 0,
  fontSize: "1.45rem",
  fontWeight: 600,
});

export const subTextContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  alignItems: "center",
});
