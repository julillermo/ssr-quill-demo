import { QDeltaContext, QDeltaContextValue } from "@/context-providers/QDelta";
import { useContext } from "react";

export function useQDelta(): QDeltaContextValue {
  const { delta, setDelta } = useContext(QDeltaContext);
  return { delta, setDelta };
}
