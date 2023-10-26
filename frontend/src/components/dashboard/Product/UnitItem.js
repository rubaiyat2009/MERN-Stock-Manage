import Close from '@mui/icons-material/Close';
import { Button, IconButton, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItem, addNewUnit } from '../../../redux/productUnit/productUnitSlice';

const ServiceItem = ({ items, type, required, setIsUnit = () => {}}) => {
    const [value, setValue] = useState("");
    const [isCreateMode, setIsCreateMode] = useState(false);
    const dispatch = useDispatch();
    const { serviceItemFetch } = useSelector(state => state.units);
    useEffect(() => {
        setIsCreateMode(false)
    }, [serviceItemFetch])
    const addItemHandler = () => {
        dispatch(addNewUnit({ name: value }))
    }



    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField onChange={(e) => setValue(e.target.value)} value={value} size='small' name="name"  />
            <Button variant='contained' sx={{ color: "#fff" }} disabled={!value} onClick={addItemHandler}>Create</Button>
            <IconButton color='error' onClick={() => {setIsCreateMode(false); setIsUnit(false)}}>
                <Close />
            </IconButton>
        </Box>
    );
};
export default ServiceItem;