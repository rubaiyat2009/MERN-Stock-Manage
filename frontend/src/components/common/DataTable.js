import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import CustomPagination from './CustomPagination';





function EnhancedTableHead(props) {
    const { order, orderBy, headings, columns } =
        props;

    return (
        <TableHead sx={{ position: "sticky", top: 0, zIndex: 10 }}>
            <TableRow>
                {(columns ? headings?.filter(({ id }) => columns?.indexOf(id) > -1) : headings).map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align === "center" ? "left" : headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.jsx ? headCell.label : <span dangerouslySetInnerHTML={{ __html: headCell.label }}></span>}

                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
    );
}


export default function DataTable({ height = "calc(100vh - 210px)", rows = [], headings = [], loading, uniqueField, detailsPath, columns, updateFields = {}, total, perPage, setPerPage, activePage, setActivePage, className, inventory }) {

    // const emptyRows = rows.length < perPage ? perPage - rows.length : 0
    const emptyRows = rows.length < perPage ? perPage - rows.length : (perPage === "all" && rows.length < 5 ? 5 - rows.length : 0)

    return (
        <Paper sx={{ width: '100%', mb: 2, mt: 3 }} elevation={0}>
            <TableContainer sx={{ height }} className={className}>
                <Table
                    stickyHeader
                    sx={{ minWidth: 750, maxHeight: "90vh", minHeight: 250, position: "relative" }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        columns={columns}
                        headings={headings}
                        rowCount={rows.length}
                    />
                    {
                        loading ?
                            <Box sx={{ position: "absolute", top: "40vh", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                                <CircularProgress />
                            </Box>
                            :
                            rows.length > 0 ?
                                <TableBody>
                                    {rows?.map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                {
                                                    (columns ? headings?.filter(({ id }) => columns?.indexOf(id) > -1) : headings)?.map(({ id, align, details }) => (
                                                        <TableCell key={id} align={align} sx={{ py: "5px" }}>
                                                            {

                                                                id === "sl" ? (index + 1 + ((activePage - 1) * perPage)) :
                                                                    updateFields[id] ? updateFields[id](row) :
                                                                        row[id]
                                                            }
                                                        </TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody> :
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ position: "absolute", top: "40vh", left: "50%", transform: "translateX(-50%)", zIndex: 2 }} variant='h4'>No Data Found!</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                    }
                </Table>

                <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mr: 2 }}>
                        Rows per page:
                        <TextField onChange={(e) => setPerPage(e.target.value)} value={perPage} size='small' select sx={{ width: 80, ml: 2 }}>
                            <MenuItem value="50">50</MenuItem>
                            <MenuItem value="100">100</MenuItem>
                            <MenuItem value="150">150</MenuItem>
                            {inventory && <MenuItem value="all">All</MenuItem>}
                        </TextField></Box>

                    {total > perPage && <CustomPagination activePage={activePage} setActivePage={setActivePage} total={total} perPage={perPage} />}
                </Box>
            </TableContainer>
        </Paper>
    );
}
