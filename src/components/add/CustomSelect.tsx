import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';

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

const colorOptions= [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "silver",
  "gold",
  "navy",
  "teal",
  "maroon",
  "olive",
  "lime",
  "aqua",
  "coral",
  "indigo",
  "salmon",
  "violet",
  "turquoise",
  "magenta",
  "cyan",
  "beige",
  "plum",
  "khaki",
  "orchid",
  "peru",
  "slate",
  "crimson",
  "chartreuse",
  "thistle",
  "linen",
  "steelblue",
  "darkorange",
  "mediumaquamarine",
  "cornflowerblue",
  "seashell",
  "palegoldenrod",
  "darkviolet",
  "firebrick",
  "mediumspringgreen",
  "lightcoral",
  "skyblue",
  "saddlebrown",
  "mediumorchid",
  "rosybrown",
  "palegreen",
  "indianred"
];

function getStyles(name: string, personName: string[], theme: Theme) {
  if (!name || !personName) {
    return {fontWeight: theme.typography.fontWeightRegular};
  }
  return {
    fontWeight:
    personName ? personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({selectedColors,setSelectedColors} : any) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedColors>) => {
    const {
      target: { value },
    } = event;
    setSelectedColors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(' ') : value,
    );
  };

  return (
    <>
      <FormControl sx={{width:'100%',my:2}}>
        <InputLabel id="demo-multiple-name-label">Color Options, You can leave empty.</InputLabel>
        <Select
          sx={{textTransform:'capitalize'}}
          variant='filled'
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedColors}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {colorOptions.map((color) => (
            <MenuItem
              key={color}
              value={color}
              style={getStyles(color, selectedColors, theme)}
            >
              <Box className="flex row wrap" sx={{gap:1}}>

              {color}
              <Box sx={{width:'20px',borderRadius:'50%',height:'20px',border:'1px solid black',background:color}}></Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
