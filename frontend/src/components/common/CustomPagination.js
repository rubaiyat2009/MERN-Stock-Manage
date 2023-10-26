import { Box, Pagination } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const CustomPagination = ({ total, perPage, activePage, setActivePage }) => {
    const [page, setPage] = useState(1)
    const handleChange = (e, value) => {
        if (setActivePage) {
            setActivePage(value)
        }
        setPage(value)
    }
    return (
        <Box sx={{ '& ul': { justifyContent: "flex-end", '& .MuiPaginationItem-root.Mui-selected': { color: "#fff " } } }}>
            <Pagination page={activePage || page} onChange={handleChange} sx={{ color: "#fff" }} count={Math.ceil((total || 1) / (perPage || 5))} color="primary" shape='rounded' />
        </Box>
    );
};

export default CustomPagination;