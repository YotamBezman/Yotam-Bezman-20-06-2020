import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TablePaginationActions from './tablePaginationActions.jsx';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 500
    },
    tableHead: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    }
}));


const PaginatedTable = props => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { rows, headers, onCheckBoxChange, onRowClick } = props;
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return <TableContainer>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHead}>
                        Mark
                    </TableCell>
                    {
                        headers.map((header, i) => (
                            <TableCell key={i} className={classes.tableHead}>
                                {header}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows)
                        .map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        color="primary"
                                        onChange={e => onCheckBoxChange(e.target.checked, row)}
                                    />
                                </TableCell>
                                {
                                    headers.map((header, i) => {
                                        return <TableCell
                                            key={i}
                                            onClick={() => onRowClick(row)}
                                        >
                                            {row[header]}
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={headers.length}
                        count={rows === undefined ? 0 : rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
}

export default PaginatedTable;
