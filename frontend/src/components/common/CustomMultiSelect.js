import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function CustomMultiSelect({ totalColumns = [], columns = [], setColumns }) {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const data = typeof value === 'string' ? value.split(',') : value;
        setColumns(data);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={columns}
                onChange={handleChange}
                input={<OutlinedInput size='small' />}
                renderValue={(selected) => selected ? "Selected Services" : ""}
                MenuProps={MenuProps}
            >
                {totalColumns?.map(({ label, id }) => (
                    <MenuItem key={id} value={id}>
                        <Checkbox checked={columns.indexOf(id) > -1} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}