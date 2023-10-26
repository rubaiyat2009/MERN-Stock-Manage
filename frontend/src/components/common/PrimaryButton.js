import { Button } from '@mui/material';
import React from 'react';

const PrimaryButton = ({ outlined, children, sx, ...props }) => {
    return (
        <Button {...props} sx={{ textTransform: "capitalize", color: "#fff", ...sx }} variant={outlined ? "outlined" : "contained"}>
            {children}
        </Button>
    );
};

export default PrimaryButton;