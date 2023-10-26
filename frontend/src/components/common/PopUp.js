import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/material';

export default function PopUp({ children, action }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    React.useEffect(() => {
        if (open) {
            document.body.onwheel = handleClose;
            document.body.addEventListener('touchstart', handleClose, false);

        }
        return () => {
            document.body.onwheel = undefined;
            document.body.removeEventListener('touchstart', handleClose,
                false);
        }
    }, [open])
    return (
        <Box>
            <Box aria-describedby={id} onClick={handleClick}>
                {action}
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {children}
            </Popover>
        </Box>
    );
}