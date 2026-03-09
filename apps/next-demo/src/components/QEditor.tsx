import { assignInlineVars } from "@vanilla-extract/dynamic";
import type ServerQuillType from "quill";
import type { Delta } from "quill";
import { forwardRef, useEffect, useRef } from "react";
import * as styles from "./QEditor.css";

type QEditorProps = {
  readOnly?: boolean;
  defaultValue?: Delta;
  placeholder?: string;
  showToolbar?: boolean;
  extraCSS?: {
    qEditorBorderRadiusVar?: string;
    qlToolbarBorderRadiusVar?: string;
    qlEditorBorderRadiusVar?: string;
  };
  onTextChange?: (contets: Delta) => void;
  exposeEditorRefOnReady?: (handle: ServerQuillType) => void;
};

const QEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      placeholder,
      showToolbar = true,
      extraCSS,
      onTextChange,
      exposeEditorRefOnReady,
    }: QEditorProps,
    ref: React.ForwardedRef<ServerQuillType>,
  ) => {
    const typedInternalRef = ref as React.RefObject<ServerQuillType | null>;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(
      function updateReadOnlyExternally() {
        if (ref) {
          typedInternalRef.current?.enable(!readOnly);
        }
      },
      [readOnly, ref],
    );

    useEffect(() => {
      const container = containerRef.current;
      if (!container || typeof window === "undefined") return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );

      // load Quill client-side and initialize the editor
      let quillIsLoaded = false;
      let removeListeners: (() => void) | undefined;

      Promise.all([import("quill")]).then(([clientQuillPackage]) => {
        if (quillIsLoaded) return;

        const ClientQuillObj = clientQuillPackage.default;
        const toolbarConfig = showToolbar
          ? {
              container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                ["link", "image", "video", "formula"],

                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],

                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],

                ["clean"],
              ],
              handlers: {},
            }
          : false;

        const quill = new ClientQuillObj(editorContainer, {
          theme: "snow",
          placeholder:
            placeholder || "The quick brown fox jumped over the lazy dog",
          readOnly: readOnly,
          modules: {
            history: {
              delay: 2000,
              maxStack: 500,
              userOnly: true,
            },
            syntax: false, // requires https://highlightjs.org/ for syntax highlighting
            toolbar: toolbarConfig,
          },
        });

        // handle editor events and methods
        if (ref) typedInternalRef.current = quill;
        if (defaultValue) {
          quill.setContents(defaultValue.ops);
        }

        // handle quill-provided API event-handlers
        quill.on("text-change", () => {
          if (onTextChange) {
            onTextChange(quill.getContents());
          }
        });

        if (exposeEditorRefOnReady) {
          exposeEditorRefOnReady(quill);
        }
      });

      return () => {
        quillIsLoaded = true;
        removeListeners?.();
        ref = null;
        container.innerHTML = "";
      };
    }, [
      placeholder,
      readOnly,
      showToolbar,
      defaultValue,
      exposeEditorRefOnReady,
      onTextChange,
      ref,
    ]);

    return (
      <div
        ref={containerRef}
        className={styles.qEditor}
        style={assignInlineVars({
          [styles.qEditorBorderRadiusVar]:
            extraCSS?.qEditorBorderRadiusVar ?? "8px",
          [styles.qlToolbarBorderRadiusVar]:
            extraCSS?.qlToolbarBorderRadiusVar ?? "8px 8px 0px 0px",
          [styles.qlEditorBorderRadiusVar]:
            extraCSS?.qlEditorBorderRadiusVar ?? "0px 0px 8px 8px",
        })}
      ></div>
    );
  },
);

QEditor.displayName = "QEditor";

export default QEditor;
