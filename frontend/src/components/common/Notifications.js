import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../../redux/notification/notificationSlice';

const Notifications = () => {
    const { notifications, isOpen } = useSelector(state => state.notification);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState({ severity: 'success', message: '' })
    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen)
        }
        if (notifications.length > 0) {
            setAlert(notifications[notifications.length - 1]);
            setTimeout(() => {
                dispatch(closeNotification());
                setOpen(false);
            }, 3500);
        }
    }, [dispatch, notifications, isOpen])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={3500}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}

        >
            <Alert variant='filled' onClose={handleClose} severity={alert.severity} sx={{ width: '100%', color: "#fff" }}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default Notifications;