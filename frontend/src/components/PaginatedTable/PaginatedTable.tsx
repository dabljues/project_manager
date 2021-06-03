import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

import {
  RowClickConfig,
  TableColumnInterface,
  TableRowInterface,
} from "../../types";

interface PaginatedTableProps {
  columns: TableColumnInterface[];
  rows: TableRowInterface[];
  rowClickConfig?: RowClickConfig;
}

const PaginatedTable = (props: PaginatedTableProps) => {
  const { columns, rows, rowClickConfig } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const additionalProps =
                  rowClickConfig === undefined
                    ? {}
                    : {
                        key: row[rowClickConfig.rowKey],
                        component: Link,
                        to: rowClickConfig.to,
                        style: { textDecoration: "none" },
                      };
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...additionalProps}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

PaginatedTable.defaultProps = { rowClickConfig: undefined };

export default PaginatedTable;
