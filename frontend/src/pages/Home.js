import { AppBar, Container, Divider, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/PrimaryButton';

const Home = () => {
    return (
        <AppBar sx={{ bgcolor: "#fff", boxShadow: "none" }}>
            <Toolbar sx={{ textAlign: "right", '& a': { textDecoration: "none" } }}>
                <Container>
                    <Link to={"/login"}>
                        <PrimaryButton>Login</PrimaryButton>
                    </Link>
                </Container>
            </Toolbar>
            <Divider />
        </AppBar>
    );
};

export default Home;