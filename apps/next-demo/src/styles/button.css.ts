import { style } from "@vanilla-extract/css";

export const button = style({
  justifyContent: "center",
  alignContent: "center",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 10px 20px rgba(99, 102, 241, 0.35)",
    },
    "&:active": {
      transform: "translateY(1px)",
    },
  },
});
