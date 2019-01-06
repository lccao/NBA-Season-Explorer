import React, {Component} from 'react';
// import {FormGroup} from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './TeamCheckbox.css';
// import './App.css'
// import data from '../data/csvjson.json';
class TeamCheckbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      teams:[],
    }
  }

  componentDidMount(){
    const teams_name = this.props.teams;
    let teams_array = Array.from(teams_name).sort();
    let teams = [];
    for (let team of teams_array) {
      const data = {
        name: team,
        isCheck: false
      };
      teams.push(data);
    }
    this.setState({teams});
  }

  handleSubmit(){
    let selectedTeams = this.state.teams.filter(team => {
      return team.isCheck===true
    })     

    let selectedTeamName = [];
    for (let team of selectedTeams) {
      selectedTeamName.push(team.name);
    }
    
    this.props.closeCheckbox();
    this.props.handleTeams(selectedTeamName);
  }

  handleChange = key => event => {
    const newTeams = this.state.teams.slice();
    newTeams[key].isCheck = event.target.checked;
    this.setState({teams:newTeams})
  };

  render(){
    const {teams} = this.state;
    // console.log(teams);
    return(
      <div className='checkbox-wrapper'>
        <div className='plot-buttom'>
        <Button
          variant="contained" 
          color="primary"
          size='small'
          onClick = {()=> this.handleSubmit()}
        >
          Plot
        </Button>
        </div>
      <div className='view'>
        <FormGroup>
            {teams.map((team, key) => {
              return(
                  <div
                    key={key}
                  >
                  <FormControlLabel                
                      control={
                        <Checkbox checked={team.isCheck} color='primary' onChange={this.handleChange(key)} value={team.name}/>
                      }
                      label={team.name}
                  />
                </div>
              )              
            })}
        </FormGroup>
        </div>
      </div>
    )
  }
}

export default TeamCheckbox;
