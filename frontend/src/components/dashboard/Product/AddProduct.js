import { Box, Grid, MenuItem, TextField, Typography, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../common/PrimaryButton';
import CategoryItem from './CategoryItem';
import UnitItem from './UnitItem';

import { useSelector } from 'react-redux';
import { twoDecimalValidator } from '../../../utils/twoDecimalValidator';



const AddProduct = ({ handleSubmit, action, value, edit, product }) => {

    const { fetch, categories } = useSelector(state => state.categories);
    const { fetch: unitFetch, units } = useSelector(state => state.units);


    const [isCategory, setIsCategory] = useState(false);
    const [isUnit, setIsUnit] = useState(false);

    useEffect(() => {
        setIsCategory(false);
    }, [fetch])

    useEffect(() => {
        setIsUnit(false);
    }, [unitFetch])

    return (
        <Box sx={{ p: 3 }} component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Name:</Typography>
                    <TextField defaultValue={product?.name} size='small' margin='dense' name="name" type="text" fullWidth required />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Category:</Typography>
                    <TextField defaultValue={product?.category?._id} select size='small' margin='dense' name="category" fullWidth required>
                        {
                            categories?.map(({ _id, name }) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)
                        }
                    </TextField>

                    <Button onClick={() => setIsCategory(true)} size='small' sx={{ textTransform: "capitalize" }}>+ Create a New Category</Button>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Price:</Typography>
                    <TextField inputProps={{ step: 0.01 }} onChange={twoDecimalValidator} defaultValue={product?.price} size='small' margin='dense' name="price" type="number" fullWidth required />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Unit:</Typography>
                    <TextField defaultValue={product?.unit?._id} select size='small' margin='dense' name="unit" fullWidth required>
                        {
                            units?.map(({ _id, name }) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)
                        }
                    </TextField>

                    <Button onClick={() => setIsUnit(true)} size='small' sx={{ textTransform: "capitalize" }}>+ Create a New Unit</Button>
                </Grid>
                <Grid item md={6} xs={12}  >
                    {
                        isCategory ?
                            <Box component={"form"}  >
                                <Box sx={{ display: "flex", alignItems: "center" }} >
                                </Box>
                                <Paper variant='none'>
                                    <Typography sx={{ fontSize: 16, fontWeight: 500, p: 0.6 }}>New category</Typography>
                                    <CategoryItem type="event" items={categories} setIsCategory={setIsCategory} />
                                </Paper>
                            </Box>
                            : null}
                </Grid>
                <Grid item md={6} xs={12}>
                    {
                        isUnit ?
                            <Box component={"form"}  >
                                <Box sx={{ display: "flex", alignItems: "center" }} >
                                </Box>
                                <Paper variant='none'>
                                    <Typography sx={{ fontSize: 16, fontWeight: 500, p: 0.6 }}>New Unit</Typography>
                                    <UnitItem type="event" items={units} setIsUnit={setIsUnit} />
                                </Paper>
                            </Box>
                            : null}
                </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", mt: 3 }}>
                <PrimaryButton sx={{ width: 150 }} type="submit">{edit ? "Edit" : "Add"} Product</PrimaryButton>
            </Box>
        </Box>
    );
};

export default AddProduct;