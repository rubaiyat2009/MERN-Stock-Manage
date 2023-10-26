import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalStatus } from '../../redux/notification/notificationSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ action, title = "title", children }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch();
    const { modalClose } = useSelector(state => state.notification);
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
        <Box>
            <Box sx={{ cursor: "pointer" }} onClick={handleClickOpen}>{action}</Box>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: "transparent", boxShadow: "none" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {title}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Divider />
                {children}
            </Dialog>
        </Box>
    );
}
