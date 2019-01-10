import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const FormList = ({team, handleChange}) => {
    return (
        <FormControlLabel          
            control={
            <Checkbox 
                checked={team.checked} 
                color='primary' 
                onChange={handleChange(team.id)} 
                value={team.name}
            />
            }
            label={team.name}
        />
    )
}

const SelectGroup = (props) => {
    const {teams} = props;
    return(
        <FormGroup>
            {teams.map(team => <FormList key={team.id} team = {team} handleChange = {props.handleChange}/>)}
        </FormGroup>
    )
    
}

export default SelectGroup;