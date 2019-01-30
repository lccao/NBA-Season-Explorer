import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function MySwitch({ checked, onChange, value, label }) {
    return(
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                    value={value}
                />
            }
            label={label}
        />
        )
    }

export default MySwitch;