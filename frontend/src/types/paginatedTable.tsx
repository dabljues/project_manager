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

interface TableRowInterface extends Dictionary<string> {}

export type { RowClickConfig, TableColumnInterface, TableRowInterface };
