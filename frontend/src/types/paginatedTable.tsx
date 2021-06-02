import Dictionary from "./generic";

interface TableColumnInterface {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
}

interface TableRowInterface extends Dictionary<string> {}

export type { TableColumnInterface, TableRowInterface };
