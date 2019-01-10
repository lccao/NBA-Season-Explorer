import React from 'react';
import Button from '@material-ui/core/Button';
import MySwitch from './MySwitch';

class ControlContainer extends React.Component {
    render() {
        return(
            <div className='control-container'>              
                <MySwitch label = 'Visitor'
                          onChange = {()=>this.props.onSwitchChange("Visitor")}
                          checked = {this.props.showVisitor}
                          value = {"Visitor"}

                />
                <MySwitch label = 'Home'
                          onChange = {()=>this.props.onSwitchChange("Home")}
                          checked = {this.props.showHome}
                          value = {"Home"}
                />
                <Button 
                    onClick={this.props.toggleCheckbox}
                    variant="contained" 
                    size='small'
                    color='primary'              
                >Select Teams</Button>                
            </div>
        )
    }
}
    

export default ControlContainer;