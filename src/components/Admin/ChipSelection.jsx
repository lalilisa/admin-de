import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, categoryName, theme) {
    return {
        fontWeight:
            categoryName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip({ data, setCategories , selectedCategory}) {
    const theme = useTheme();
    const [categoryName, setCategoryName] = React.useState([]);
    
    useEffect(()=>{
        setCategoryName(selectedCategory ? selectedCategory : []);
        console.log('categoryName',categoryName)
    },[selectedCategory])
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCategoryName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        
        setCategories(data?.filter(e=>categoryName.includes(e?.name)));

    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 382, margin: 0 }}>
                <InputLabel id="demo-multiple-chip-label">Thể loại</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, margin: 0 }}>
                            {selected.map((value) => (

                                <>
                                    <Chip key={value} label={value} style={{paddingLeft : '5px'}}  />

                                </>

                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {data.map((e) => (
                        <MenuItem

                            key={e?.name}
                            value={e?.name}
                            style={getStyles(e?.name, categoryName, theme)}
                        >
                            {e?.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
