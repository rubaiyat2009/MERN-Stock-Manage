import Close from '@mui/icons-material/Close';
import { Button, IconButton, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory } from '../../../redux/productCategory/productCategorySlice';

const ServiceItem = ({ items, type, required, setIsCategory = () => {}}) => {
    const [value, setValue] = useState("");
    const [isCreateMode, setIsCreateMode] = useState(false);
    const dispatch = useDispatch();
    const { serviceItemFetch } = useSelector(state => state.categories);
    useEffect(() => {
        setIsCreateMode(false)
    }, [serviceItemFetch])
    const addItemHandler = () => {
        dispatch(addNewCategory({ name: value }))
    }



    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField onChange={(e) => setValue(e.target.value)} value={value} size='small' name="name"  />
            <Button variant='contained' sx={{ color: "#fff" }} disabled={!value} onClick={addItemHandler}>Create</Button>
            <IconButton color='error' onClick={() => {setIsCreateMode(false); setIsCategory(false)}}>
                <Close />
            </IconButton>
        </Box>
    );
};
export default ServiceItem;