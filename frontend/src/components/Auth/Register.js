import { Box, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/authSlice';
import PrimaryButton from '../common/PrimaryButton';
import { green } from '@mui/material/colors';
const Register = () => {
    const navigate = useNavigate();
    const { redirect, isLoading } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get('email'),
            password: data.get('password')
        }
        dispatch(register(registerData))
    };

    if (redirect?.status) {
        navigate(redirect?.path || "/login")
    }
    return (
        <Box>
            <Typography variant="h3" sx={{ fontSize: 64, fontWeight: 600, lineHeight: 1.2 }}>Create an account</Typography>
            <Typography sx={{ fontSize: 20, mb: 8, "& a": { color: "primary.main", textDecoration: "none" } }}>Already a member? <Link to="/login">Log in</Link> </Typography>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <Box component={"form"} onSubmit={handleSubmit}>
                        <TextField margin='dense' fullWidth type="text" placeholder="First Name" name="firstName" />
                        <TextField margin='dense' fullWidth type="text" placeholder="Last Name" name="lastName" />
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
                            <PrimaryButton sx={{ mt: 1 }} type='submit' variant='contained'>Create Account</PrimaryButton>
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

export default Register;