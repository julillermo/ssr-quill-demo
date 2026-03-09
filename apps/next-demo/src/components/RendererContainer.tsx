import { useQDelta } from "../hooks/useQDelta";
import * as layout from "../styles/App.css";
import * as stylesCommon from "../styles/index";
import QEditor from "./QEditor";
import * as styles from "./RendererContainer.css";

export function RendererContainer() {
  const { delta } = useQDelta();

  return (
    <section className={layout.mainPanel}>
      {delta !== null ? (
        <>
          <QEditor
            readOnly={true}
            defaultValue={delta}
            showToolbar={false}
            extraCSS={{
              qEditorBorderRadiusVar: "8px",
              qlEditorBorderRadiusVar: "8px",
            }}
          />
          <div className={stylesCommon.container.card}>
            <div>Raw Delta.ops value:</div>
            <div className={styles.rawDeltaOps}>
              {JSON.stringify(delta?.ops, null, 2)}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyRendererPanel}>
          <p>[rendered output goes here]</p>
        </div>
      )}
    </section>
  );
}
