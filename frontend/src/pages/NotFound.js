import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const NotFound = () => {
    return (
        <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant='h1' sx={{ textAlign: "center", fontWeight: 700 }}>Page Not Found!</Typography>
        </Box>
    );
};

export default NotFound;