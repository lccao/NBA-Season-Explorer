import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import SelectGroup from './SelectGroup';
import './SelectFormContainer.css';


class SelectFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      teams:[]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const teamNames = nextProps.teamNames;
    let name_array = Array.from(teamNames).sort();
    let teams = [];
    
    for (let i in name_array){
      const data = {
        id: i,
        name: name_array[i],
        checked: false
      };
      teams.push(data);
    }
    
    this.setState({teams});
  }
    
  handleChange = key => event => {
    const newTeams = this.state.teams.slice();
    newTeams[key].checked = event.target.checked;
    this.setState({teams:newTeams})
  };

  handleSubmit(){
    let selectedTeams = this.state.teams.filter(team => team.checked);

    let selectedTeamName = [];
    
    selectedTeams.forEach(team => {
      selectedTeamName.push(team.name);
    })
    
    this.props.closeCheckbox();
    this.props.handleSelectTeam(selectedTeamName);
  }  

  render(){
    const {teams} = this.state;
    const {showCheckbox} = this.props;
    
    return(
      <div>
        {showCheckbox && (
          <div className='select-form-wrapper'>
            <div className='plot-buttom'>
              <Button variant="contained" color="primary" size="small" onClick={this.handleSubmit}>
                Plot
              </Button>
            </div>
            <div className='select-form'>
              <SelectGroup 
                  teams={teams}
                  handleSelectTeam={this.props.handleSelectTeam}
                  handleChange={this.handleChange}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SelectFormContainer;
