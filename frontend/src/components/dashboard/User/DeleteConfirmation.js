import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/notification/notificationSlice';

const DeleteConfirmation = ({ deleteHandler }) => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(closeModal())
    }
    return (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button variant='contained' color="error" onClick={deleteHandler}>Confirm</Button>
            <Button variant='contained' onClick={close}>Cancel</Button>
        </Box>
    );
};

export default DeleteConfirmation;