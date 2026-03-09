import type Quill from "quill";
import { Delta, type Range } from "quill";
import { useRef, useState } from "react";

import QuillEditor from "./QuillEditor";

const QuillApp = () => {
  const [range, setRange] = useState<Range | undefined>(undefined);
  const [lastChange, setLastChange] = useState<Delta | undefined>(undefined);
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill | null>(null);

  return (
    <div>
      <QuillEditor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert("Hello")
          .insert("\n", { header: 1 })
          .insert("Some ")
          .insert("initial", { bold: true })
          .insert(" ")
          .insert("content", { underline: true })
          .insert("\n")}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      <div id="hook-into-quill-from-outside-control">
        <div className="controls">
          <label>
            Read Only:{" "}
            <input
              type="checkbox"
              value={readOnly ? "true" : "false"}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
          </label>
          <button
            className="controls-right"
            type="button"
            onClick={() => {
              alert(quillRef.current?.getLength());
            }}
          >
            Get Content Length
          </button>
        </div>
        <div className="state">
          <div className="state-title">Current Range:</div>
          {range ? JSON.stringify(range) : "Empty"}
        </div>
        <div className="state">
          <div className="state-title">Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : "Empty"}
        </div>
      </div>
    </div>
  );
};

export default QuillApp;
