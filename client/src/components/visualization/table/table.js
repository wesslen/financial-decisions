import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "lightgrey",
    color: "black",
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tablecontainer: {
    marginBottom: 20,
  },
});

const DataTable = (props) => {
  // Use the state and functions returned from useTable to build your UI
  //   const { getTableProps, headerGroups, rows, prepareRow } = useTable({
  //     columns,
  //     data,
  //   })
  const classes = useStyles();

  const getNestedData = (data, nCols) => {
    let nestedData = [];
    for (let j = 0; j < data.length; j += nCols) {
      nestedData.push(data.slice(j, j + 5));
    }

    return nestedData;
  };
  const nCols = 5;
  const columns = [...Array(5).keys()];
  const data = getNestedData(
    props.data.sort((a, b) => {
      return b.value - a.value;
    }),
    nCols
  );

  console.log(data);

  // Render the UI for your table
  return (
    <TableContainer className={classes.tablecontainer} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={nCols} align="center">
              {`Fund ${props.title}: ${props.allocation}%`}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => {
            return (
              <StyledTableRow key={`row-${i}`}>
                {row.map((cell, j) => {
                  return (
                    <StyledTableCell align="center" key={`cell-${i}${j}`}>
                      {`${(cell.value * 100).toFixed(2)}%`}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
