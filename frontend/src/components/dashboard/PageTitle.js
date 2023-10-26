import { Typography } from '@mui/material';
import React from 'react';

const PageTitle = ({ children }) => {
    return (
        <Typography sx={{ fontWeight: 600, fontSize: 26 }} variant="h4">{children}</Typography>
    );
};

export default PageTitle;