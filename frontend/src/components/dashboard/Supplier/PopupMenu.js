import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import CustomModal from '../../common/CustomModal';
import DeleteConfirmation from '../User/DeleteConfirmation';


const items = ["purchase", "stock", "petty-cash", "sales"];
const labels = ["Purchase", "Stock", "Petty Cash", "Sales"];
export default function PopupMenu({ id, deleteHandler }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={ids} variant="contained" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={ids}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >

                <Box sx={{ minWidth: 170 }}>
   
                    <CustomModal title={"Are you sure to delete?"} sx={{ maxWidth: 400, borderRadius: "0px" }} action={
                        <ListItemButton>
                            <ListItemText sx={{ color: 'error.main' }}>Remove List</ListItemText>
                        </ListItemButton>
                    }>
                        <DeleteConfirmation deleteHandler={() => deleteHandler(id)} />
                    </CustomModal>
                </Box>
            </Popover>
        </div>
    );
}