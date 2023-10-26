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


export default function MultiSelect({ localStorageKey, totalColumns = [], columns, setColumns }) {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const data = typeof value === 'string' ? value.split(',') : value;
        setColumns(data);
        localStorage.setItem(localStorageKey, JSON.stringify(data))
    };

    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Columns</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={columns}
                onChange={handleChange}
                input={<OutlinedInput label="Columns" size='small' />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {totalColumns.filter(({ hidden }) => !hidden).map(({ label, id, required }) => (
                    <MenuItem disabled={required} key={id} value={id}>
                        <Checkbox checked={columns.indexOf(id) > -1} />
                        <ListItemText primary={label.replaceAll("<br/>", "")} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}