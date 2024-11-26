"use client";

import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext<
  | {
      isCollapsed: boolean;
      setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <LayoutContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};
