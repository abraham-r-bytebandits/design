import React from "react";

export interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: any;
}

const RowContext = React.createContext<RowContextProps>({});

export default RowContext;
