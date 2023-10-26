import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress, TextField, Typography } from '@mui/material';
import MoreButton from './common/MoreButton';
import { Link } from 'react-router-dom';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}




function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, headings, handleChange, columns } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow>
                {headings.filter(({ id }) => columns.indexOf(id) > -1).map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align === "center" ? "left" : headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.id === "sl" || headCell.id === "custom" ?
                                <Box component={"span"} sx={{ whiteSpace: "nowrap" }}>{headCell.label}</Box> :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: headCell.label }}></span>
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                {headings.filter(({ id }) => columns.indexOf(id) > -1).map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align === "center" ? "left" : headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {
                            headCell.id === "sl" || headCell.id === "custom" ?
                                <></> :
                                <TextField onChange={handleChange} name={headCell.id} size='small' label={headCell.label.replaceAll("<br/>", "")} />

                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
    );
}


export default function CustomDataTable({ rows = [], headings = [], loading, uniqueField, detailsPath, columns = [] }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(headings[0]?.id || "");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [queries, setQueries] = React.useState({});

    React.useEffect(() => {
        setData(rows);
    }, [rows]);


    React.useEffect(() => {
        const handleSearch = () => {
            let data = rows;
            Object.keys(queries).forEach((key) => (
                data = data.filter(user => user[key]?.toLowerCase()?.indexOf(queries[key]?.toLowerCase()) > -1)
            ))
            setData(data);
        }
        handleSearch()
    }, [queries, rows])

    function handleChange({ target }) {
        setQueries(pre => ({
            ...pre,
            [target.name]: target.value
        }))
    }
    const handleRequestSort = (_event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Paper sx={{ width: '100%', mb: 2, mt: 3 }} elevation={0}>
            <TableContainer sx={{ height: "55vh" }}>
                <Table
                    stickyHeader
                    sx={{ minWidth: 750, maxHeight: "90vh", position: "relative" }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        columns={columns}
                        headings={headings}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        handleChange={handleChange}
                    />
                    {
                        loading ?
                            <Box component={"tbody"} sx={{ position: "absolute", top: "40vh", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                                <Box component={"tr"}>
                                    <Box component={"td"}><CircularProgress /></Box>
                                </Box>
                            </Box>
                            :
                            data.length > 0 ?
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                                    {stableSort(data, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={index}
                                                >
                                                    {
                                                        headings && headings.filter(({ id }) => columns.indexOf(id) > -1).map(({ id, align, details }) => (
                                                            <TableCell key={id} align={align}>
                                                                {
                                                                    details ?
                                                                        <Box component={"span"} sx={{ '& a': { textDecoration: "none", color: "blue", "&:hover": { color: "#FF00FF" } } }}>
                                                                            <Link to={`/dashboard/${detailsPath}/${row[uniqueField]}`}>
                                                                                {row[id]}
                                                                            </Link>
                                                                        </Box> :
                                                                        id === "sl" ? (index + 1 + page * rowsPerPage) :
                                                                            id === "custom" ?
                                                                                <MoreButton id={row[uniqueField]} detailsPath={detailsPath} /> :
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
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
