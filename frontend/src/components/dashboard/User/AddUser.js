import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
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
        required: true
    },
]

const AddUser = ({ handleSubmit }) => {
    return (
        <Box sx={{ p: 3 }} component={"form"} onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>User role</Typography>
            <RadioGroup defaultValue={roles[0].name}>

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
                            <TextField size='small' margin='dense' name={name} type={type} fullWidth required={required} />
                        </Grid>
                    ))
                }
                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, color: "secondary.main" }}>Status:</Typography>
                    <TextField defaultValue={"pending"} select size='small' margin='dense' name="status" fullWidth required>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="verified">Verified</MenuItem>
                    </TextField>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Typography sx={{ fontSize: 18, color: "secondary.main" }}>Telephone:</Typography>
                    <TextField size='small' margin='dense' name={'telephone'} fullWidth required />
                </Grid>

            </Grid>
            <Box sx={{ textAlign: "right", mt: 3 }}>
                <PrimaryButton sx={{ width: 150 }} type="submit">Add User</PrimaryButton>
            </Box>
        </Box>
    );
};

export default AddUser;