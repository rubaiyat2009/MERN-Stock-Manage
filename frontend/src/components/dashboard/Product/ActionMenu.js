import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomModal from '../../common/CustomModal';
import DeleteConfirmation from '../User/DeleteConfirmation';
// import EditProduct from './Product/EditProduct';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../../../redux/products/productsSlice';
import AddProduct from './AddProduct';



export default function ActionMenu({ id, product, }) {

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;
    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const editHandler = (e) => {
        e.preventDefault();
        const formValue = new FormData(e.currentTarget);
        const data = {
            name: formValue.get("name"),
            price: formValue.get("price"),
            category: formValue.get("category"),
            unit: formValue.get("unit")
        }
        dispatch(updateProduct({ id, data }))
    }
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

                    <CustomModal title={"Edit Product"} action={
                        <ListItemButton>
                            <ListItemText  >Edit</ListItemText>
                        </ListItemButton>
                        // <ListItemButton sx={{ px: 2, py: 1, fontWeight: 700 }} handleSubmit={handleSubmit} selectedServices={selectedServices} setSelectedServices={setSelectedServices}>Edit</ListItemButton>
                    }>
                        <AddProduct edit handleSubmit={editHandler} product={product} />
                    </CustomModal>
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
