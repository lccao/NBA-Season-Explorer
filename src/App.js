import React, {Component} from 'react';
// import {FormGroup} from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TeamCheckbox from './components/TeamCheckbox/TeamCheckbox';
import Chart from './components/Chart/Chart';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      showCheckbox:false,
      teams:[],
      selectedTeams:[],
      showVisitor:true,
      showHome: true,
      input:"",
      showAlertBox:false
      
      
    }
  }

  componentDidMount(){
    this.formatInputData();
  }
  
  formatInputData(){
    const data = require('./csvjson.json');
    let teams = new Map();
    for (let item of data) {
      const visitor_team = item['Visitor/Neutral'];
      const home_team = item['Home/Neutral'];
      if (!teams.has(visitor_team)){
        teams.set(visitor_team,[]);
      }
      if (!teams.has(home_team)) {
        teams.set(home_team, []);
      }

      const visitor_data = {
        date:item['Date'],
        isVisitor: true,
        score: item['PTS(Visitor)'],
      }

      const home_data = {
        date: item['Date'],
        isVisitor: false,
        score: item['PTS(Home)'],
      }

      teams.set(visitor_team, teams.get(visitor_team).slice().concat(visitor_data));
      teams.set(home_team, teams.get(home_team).slice().concat(home_data));
    }
      this.setState({teams});
  }

  toggleCheckbox() {
    this.setState({
      showCheckbox:  !this.state.showCheckbox
    })
  }

  handleSelectTeam(names) {
    let selectedTeams = [];
    for (let name of names) {
      const team = {
        name: name,
        data: this.state.teams.get(name),
      }
      selectedTeams.push(team);
    }
    this.setState({
      selectedTeams
    })
  }

  handleSwitch(type){
    type === 'visitor'? 
    this.setState({
      showVisitor:!this.state.showVisitor
    })
    :
    this.setState({
      showHome:!this.state.showHome
    })
  }

  generateSampleData(){
    // console.log("sample::",this.state.teams.get("Golden State Warriors"));
    let input_data = [];
    const sample_data = {
      name:"Golden State Warriors",
      data: this.state.teams.get("Golden State Warriors")
    }
    input_data.push(sample_data)
    
    console.log("input_data",input_data);
    this.setState({
      input: JSON.stringify(input_data)
    })
  }

  handleDataInput(){
    try {
      JSON.parse(this.state.input);
    } catch(e) {
      this.setState({
        showAlertBox:true
      })
      return;
    }
    this.setState({
      selectedTeams: JSON.parse(this.state.input)
    })
  }

  handleAlertBoxClose(){
    this.setState({
      showAlertBox:false
    })
  }

  render(){
    const {selectedTeams} = this.state;
    const data_placeholder=`[\n{"name":"Golden State Warriors","data":[{"date":"10/25/16","isVisitor":false,"score":100},{"date":"10/29/16","isVisitor":true,"score":120}]},\n{"name":"Los Angeles Lakers","data":[{"date":"11/1/16","isVisitor":true,"score":106},{"date":"11/3/16","isVisitor":true,"score":118}]}\n]`;
    return(
      <div className='app'>
        <div className='chart'>
            <Chart 
              selectedTeams = {selectedTeams}
              showVisitor = {this.state.showVisitor}
              showHome = {this.state.showHome}
            />
        </div>      
        <div>
        {
          this.state.showCheckbox?
          <div className='checkbox'>
          <TeamCheckbox 
            teams={this.state.teams.keys()}
            closeCheckbox = {()=>this.toggleCheckbox()}
            handleTeams = {(teams) => this.handleSelectTeam(teams)}
          />
          </div>:null
        }
        
          <div className='control-wrapper'>
            <div className='control'>
              {/* <FormGroup row> */}
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.showVisitor}
                    onChange={()=>this.handleSwitch('visitor')}
                    color='primary'
                    value="checkedVisitor"
                  />
                }
                label="Visitor"
              />
               <FormControlLabel
                control={
                  <Switch
                    checked={this.state.showHome}
                    onChange={()=>this.handleSwitch('home')}
                    color='primary'
                    value="checkedHome"
                  />
                }
                label="Home"
              />
            </div>
            <div className='control'>
            <Button 
              onClick={()=>this.toggleCheckbox()}
              variant="contained" 
              size='small'
              color='primary'              
              > Select Teams </Button>
            </div>
          </div>
        </div>
        <div className='input-wrapper'>
          <TextField
            id="outlined-multiline-flexible"
            label="Input Data"
            multiline
            rows='8'
            rowsMax="8"
            value={this.state.input}
            onChange={(e)=>{this.setState({input:e.target.value})}}
            margin="normal"
            placeholder={data_placeholder}
            variant="outlined"
          />
          <div className='input-button'>
          <Button onClick={()=>this.generateSampleData()} 
                  variant='contained'
                  size='small'
                  fullWidth
                  color='primary'
                  >
                  Sample Input
          </Button>
          </div>
          <div className='input-button'>
          <Button onClick={()=>this.handleDataInput()} 
                  variant='contained'
                  disabled = {this.state.input === "" ? true : false}
                  size='small'
                  fullWidth
                  color='primary'>
                  Plot
          </Button>
          </div>
        </div>
        <div className='alert'>
            <Dialog
              open={this.state.showAlertBox}
              onClose={()=>this.handleAlertBoxClose()}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Incorrect input format"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Try the sample data first!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.handleAlertBoxClose()} color="primary" autoFocus style={{margin:'0 auto'}}>
                  Got it!
                </Button>
              </DialogActions>
            </Dialog>
        </div>
      </div>
    )
}
}
export default App;
