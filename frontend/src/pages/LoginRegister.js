import { AppBar, Box, Container, Divider, Toolbar } from '@mui/material';
import React from 'react';
import Login from '../components/Auth/Login';
import logo from "./../assets/images/logo/logo.svg";
import bgImg from "./../assets/images/login/bg.png";
const LoginRegister = () => {
    return (
        <Box sx={{ backgroundImage: `url("${bgImg}")`, backgroundSize: "contain", backgroundPositionX:"right", backgroundPositionY:"50px", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>
            <AppBar sx={{ bgcolor: "white", boxShadow: "none", '& img': { maxHeight: 25 } }}>
                <Toolbar sx={{ mx: 8 }}>
                    <b>Stock Manage</b>
                    {/* <img src={logo} alt="" /> */}
                </Toolbar>
                <Divider />
            </AppBar>
            <Container>
                <Box sx={{ pt: "15vh" }}>
                    <Login />
                </Box>
            </Container>
        </Box>
    );
};

export default LoginRegister;