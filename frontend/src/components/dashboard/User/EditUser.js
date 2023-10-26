import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo, getUserDetails } from '../../../redux/users/userSlice';
import PreLoader from '../../common/PreLoader';
import PrimaryButton from '../../common/PrimaryButton';

const roles = [
    {
        id: 101,
        label: "Admin",
        name: "admin",
        info: "Admin can control the platform."
    },
    {
        id: 102,
        label: "User",
        name: "user",
        info: "User can control the platform."
    },
]


const inputFields = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: false
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        required: true
    },
    {
        name: "password",
        label: "Password",
        type: "password",
    },
    {
        name: "telephone",
        label: "Telephone",
        type: "text",
    },
]

const EditUser = ({ id }) => {
    const { userDetails, isUserDetailsLoading, isEditLoading } = useSelector(state => state.users);
    const [userInfo, setUserInfo] = useState({})
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(getUserDetails(id));
        }
    }, [id, dispatch])

    const handleChange = (e) => {
        setUserInfo(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUserInfo({ data: userInfo, id }))
    }
    if (isUserDetailsLoading) {
        return <PreLoader />
    }

    return (
        <Box sx={{ p: 3 }} component={"form"} onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>User role</Typography>
            <RadioGroup onChange={handleChange} defaultValue={userDetails?.role} value={userInfo?.role}>

                <Grid container spacing={3}>
                    {
                        roles.map(({ id, label, name, info }) => (
                            <Grid key={id} item md={6} xs={12}>
                                <FormControlLabel value={name} control={<Radio required name='role' />}
                                    label={
                                        <>
                                            <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 2 }}>{label}</Typography>

                                            <Typography>{info}</Typography>
                                        </>
                                    } />
                            </Grid>
                        ))
                    }
                </Grid>
            </RadioGroup>
            <Grid container spacing={2} mt={2}>
                {
                    inputFields.map(({ name, label, type, required }) => (
                        <Grid key={name} item md={6} xs={12}>
                            <Typography sx={{ fontSize: 18, color: "secondary.main" }}>{label}:</Typography>
                            <TextField onChange={handleChange} defaultValue={userDetails?.[name]} value={userInfo?.[name]} size='small' margin='dense' name={name} type={type} fullWidth required={required} />
                        </Grid>
                    ))
                }
                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, color: "secondary.main" }}>Status:</Typography>
                    <TextField select onChange={handleChange} defaultValue={userDetails?.status} value={userInfo?.status} size='small' margin='dense' name="status" fullWidth required>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="verified">Verified</MenuItem>
                    </TextField>
                </Grid>
            </Grid>


            <Box sx={{ textAlign: "right", mt: 3 }}>
                {isEditLoading && <PreLoader />}
                <PrimaryButton sx={{ width: 150 }} type="submit">Update User</PrimaryButton>
            </Box>
        </Box>
    );
};

export default EditUser;