import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalStatus } from '../../redux/notification/notificationSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "20px",
    p: 2,
    maxHeight: "95vh",
    overflowY: "auto"
};

export default function CustomModal({ children, action, sx, title }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { modalClose } = useSelector(state => state.notification);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        if (modalClose) {
            handleClose();
            setTimeout(() => {
                dispatch(updateModalStatus())
            }, 1000);
        }
    }, [modalClose, dispatch])
    return (
        <>
            <Box sx={{ cursor: "pointer" }} onClick={handleOpen}>{action}</Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, ...sx }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}>
                        <Typography variant="h5" >{title}</Typography>
                        <IconButton onClick={handleClose}><CloseIcon /> </IconButton>
                    </Box>
                    {children}
                </Box>
            </Modal>
        </>
    );
}
