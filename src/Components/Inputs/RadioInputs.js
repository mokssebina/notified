import React from 'react'

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';


const RadioInputs = ({ types, selected, handleChange }) => {
    return (
        <FormControl>
            <RadioGroup
                row
                value={selected}
                onChange={handleChange}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ color: "#ffffff" }}
            >
                {types.map((item) => (
                    <Tooltip key={item.id} title={item.description}>
                        <FormControlLabel
                            
                            control={
                                <Radio 
                                value={item.name}
                                sx={{
                                    color: "#ffffff",
                                    '&.Mui-checked': {
                                        color: "#f97015",
                                    }
                                }} 
                                />
                            }
                            label={item.name}
                        />
                    </Tooltip>
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioInputs