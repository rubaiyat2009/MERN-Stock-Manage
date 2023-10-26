import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PreLoader from '../components/common/PreLoader';
import { verify } from '../redux/auth/authSlice';

const Verification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { isLoading, isError, redirect } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            dispatch(verify({ token }))
        }
    }, [token, dispatch]);
    if (isError) {
        navigate("/")
    }
    if (redirect.status) {
        navigate(redirect.path || "/login")
    }
    if (isLoading) {
        return <PreLoader />
    }
    return (
        <Box>
        </Box>
    );
};

export default Verification;