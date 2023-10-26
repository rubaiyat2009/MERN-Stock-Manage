import { Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
import PrimaryButton from '../common/PrimaryButton';
import { green } from '@mui/material/colors';
const Login = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { isAuthenticated, isLoading } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = {
            email: data.get('email'),
            password: data.get('password')
        }
        dispatch(login(loginData))
    };

    if (isAuthenticated) {
        navigate("/dashboard")
        window.location.reload()
    }
    return (
        <Box>
            <Typography variant="h3" sx={{ fontSize: 64, fontWeight: 600, lineHeight: 1.2 }}>Welcome to Stock<Box component={"span"} sx={{ color: "primary.main" }}>Manage</Box></Typography>
            <Typography sx={{ fontSize: 20, mb: 4 }}>Managing stock easier in one place</Typography>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <Box component={"form"} onSubmit={handleSubmit}>
                        <TextField margin='dense' fullWidth type="email" placeholder="Email Address" name="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <TextField margin='dense' fullWidth type="password" placeholder="Password" name="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ position: "relative", display: "inline-block" }}>
                            <PrimaryButton sx={{ mt: 1, width: 135 }} type='submit' variant='contained'>Login</PrimaryButton>
                            {isLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        mt: -1,
                                        ml: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;