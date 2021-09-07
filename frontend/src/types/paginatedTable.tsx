import React from "react";
import Dictionary from "./generic";

interface TableColumnInterface {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
}

interface RowClickConfig {
  rowKey: string;
  to: string;
}

interface TableRowInterface {
  name: string;
  [key: string]: any;
}

export type { RowClickConfig, TableColumnInterface, TableRowInterface };
