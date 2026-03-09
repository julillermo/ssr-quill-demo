import Quill, { type Delta, type Range } from "quill";
import { forwardRef, useEffect, useRef } from "react";
import * as styles from "./QuillEditor.css.js";

type QuillEditorProps = {
  readOnly?: boolean;
  defaultValue?: Delta;
  placeholder?: string;
  onTextChange?: React.Dispatch<React.SetStateAction<Delta | undefined>>;
  onSelectionChange?: React.Dispatch<React.SetStateAction<Range | undefined>>;
};

// Editor is an uncontrolled React component
const QuillEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      placeholder,
      onTextChange,
      onSelectionChange,
    }: QuillEditorProps,
    ref: React.ForwardedRef<Quill>,
  ) => {
    const typedRef = ref as React.RefObject<Quill | null>;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(
      function updateReadOnlyFromOutsideControl() {
        typedRef.current?.enable(!readOnly);
      },
      [readOnly, typedRef],
    );

    useEffect(
      function initializeQuill() {
        const container = containerRef.current;
        if (container === null) return;

        // hook into the DOM
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement("div"),
        );

        // Initialize Quill on the container
        const quill = new Quill(editorContainer, {
          placeholder: placeholder || "Start typing here...",
          theme: "snow",
          readOnly: readOnly,
          modules: {
            history: {
              delay: 1000,
              maxStack: 500,
              userOnly: true,
            },
            syntax: false, // requires https://highlightjs.org/
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
            ],
          },
        });
        typedRef.current = quill;

        if (defaultValue) {
          quill.setContents(defaultValue);
        }

        quill.on(Quill.events.TEXT_CHANGE, (delta) => {
          if (onTextChange) {
            onTextChange(delta);
          }
        });

        quill.on(Quill.events.SELECTION_CHANGE, (args) => {
          if (onSelectionChange) {
            onSelectionChange(args);
          }
        });

        // cleanup useEffect
        return () => {
          typedRef.current = null;
          (ref as { current: Quill | null }).current = null;
          container.innerHTML = "";
        };
      },
      [defaultValue, onSelectionChange, onTextChange, ref, typedRef, placeholder, readOnly],
    );

    return <div ref={containerRef} className={styles.quillEditor}></div>;
  },
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
