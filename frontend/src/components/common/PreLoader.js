import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const PreLoader = () => {
    return (
        <Box sx={{ position: "absolute", top: "40vh", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
            <CircularProgress />
        </Box>
    );
};

export default PreLoader;