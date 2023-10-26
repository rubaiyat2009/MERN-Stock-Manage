import { AppBar, Avatar, Box, Divider, styled, Toolbar } from '@mui/material';
import React from 'react';



const MuiAppBar = styled(AppBar)(({ theme }) => ({
    height: 80,
    position: "static",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "none",
}));
const Header = ({ children }) => {
    return (
        <MuiAppBar>
            <Toolbar
                sx={{
                    height: 80,
                    px: '24px',
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    {children}
                </Box>
                <Avatar />
            </Toolbar>
            <Divider />
        </MuiAppBar>
    );
};

export default Header;