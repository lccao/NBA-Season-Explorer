import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class InputContainer extends React.Component {
    render(){
        const data_placeholder=`[\n{"name":"Golden State Warriors","data":[{"date":"10/25/16","isVisitor":false,"score":100},{"date":"10/29/16","isVisitor":true,"score":120}]},\n{"name":"Los Angeles Lakers","data":[{"date":"11/1/16","isVisitor":true,"score":106},{"date":"11/3/16","isVisitor":true,"score":118}]}\n]`;
        return(
            <div className='input-container'>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Input Data"
                    multiline
                    rows="8"
                    rowsMax="8"
                    value={this.props.input}
                    onChange={this.props.onTextInputChange}
                    margin="normal"
                    placeholder={data_placeholder}
                    variant="outlined"
                />
                <div className='input-button'>
                    <Button variant="contained" size="small" fullWidth color="primary" onClick={this.props.generateDataButtonClick}>
                        Sample Input
                    </Button>
                </div>
                <div className='input-button'>
                    <Button variant="contained" disabled = {this.props.input === ''} size="small" fullWidth color="primary" onClick={this.props.handleDataInput}>
                        Plot
                    </Button>
                </div>
        </div>
        )
    }
}

export default InputContainer;