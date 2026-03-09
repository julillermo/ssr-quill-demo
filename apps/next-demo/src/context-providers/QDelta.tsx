import type { Delta } from "quill";
import React, { type ReactNode } from "react";

// Context
export type QDeltaContextValue = {
  delta: Delta | null;
  setDelta: (delta: Delta | null) => void;
};
export const QDeltaContext = React.createContext<QDeltaContextValue>({
  delta: null,
  setDelta: () => {
    throw new Error("setDelta function must be implemented.");
  },
});

// Provider
type QDeltaProviderProps = QDeltaContextValue & { children: ReactNode };
export function QDeltaProvider({
  delta,
  setDelta,
  children,
}: QDeltaProviderProps): ReactNode {
  return (
    <QDeltaContext.Provider
      value={{
        delta,
        setDelta,
      }}
    >
      {children}
    </QDeltaContext.Provider>
  );
}
