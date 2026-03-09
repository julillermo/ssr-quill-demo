import { createVar, globalStyle, style } from "@vanilla-extract/css";

export const qEditorBorderRadiusVar = createVar();
export const qlToolbarBorderRadiusVar = createVar();
export const qlEditorBorderRadiusVar = createVar();

export const qEditor = style({
  borderRadius: qEditorBorderRadiusVar,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  height: "100%",
});

globalStyle(`${qEditor} .ql-toolbar`, {
  backgroundColor: "#ffffff",
  borderRadius: qlToolbarBorderRadiusVar,
});

globalStyle(`${qEditor} .ql-container`, {
  backgroundColor: "#ffffff",
  borderRadius: qlEditorBorderRadiusVar,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  color: "black",
  minHeight: 0,
});

globalStyle(`${qEditor} .ql-container .ql-editor`, {
  flex: 1,
  minHeight: 0,
});

/* Other class-names that may be of interest
    .ql-toolbar
    .ql-icon-picker
    .ql-icon-picker
    .ql-container
    .ql-editor
    .ql-video
  I believe these can be determined via the browser inspecter.
  You should also be able to style specific elements using n-th css logic
*/
