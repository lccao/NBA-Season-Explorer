import React, {Component} from 'react';
import Chart from './components/Chart/Chart';
import AlertBox from './components/AlertBox/AlertBox';
import InputContainer from './components/InputContainer/InputContainer';
import ControlContainer from './components/ControlContainer/ControlContainer';
import SelectFormContainer from './components/SelectFormContainer/SelectFormContainer';
import './App.css'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCheckbox:false,
      teams:[],
      selectedTeams:[],
      showVisitor:true,
      showHome: true,
      input:"",
      showAlertBox:false
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleSelectTeam = this.handleSelectTeam.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleAlertBoxClose = this.handleAlertBoxClose.bind(this);
    this.handleDataInput = this.handleDataInput.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.generateSampleData = this.generateSampleData.bind(this);
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

    names.forEach(name => {
      const team = {
        name: name,
        data: this.state.teams.get(name),
      }
      selectedTeams.push(team);
    })
      
    this.setState({selectedTeams})
  }

  handleSwitch(type){
    type === 'Visitor'? 
    this.setState({
      showVisitor:!this.state.showVisitor
    })
    :
    this.setState({
      showHome:!this.state.showHome
    })
  }

  generateSampleData(){
    let input_data = [];
    const sample_data = {
      name:"Golden State Warriors",
      data: this.state.teams.get("Golden State Warriors")
    }
    input_data.push(sample_data)
    
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

  handleTextInput(e){
    this.setState({
      input: e.target.value
    })
  }

  handleAlertBoxClose(){
    this.setState({
      showAlertBox:false
    })
  }

  render(){
    const {selectedTeams} = this.state;
    return(
      <div className='app'>
        <Chart 
          selectedTeams={selectedTeams}
          showVisitor={this.state.showVisitor}
          showHome={this.state.showHome}
        />      
        <ControlContainer 
          showCheckbox={this.state.showCheckbox}
          toggleCheckbox={this.toggleCheckbox}
          onSwitchChange={this.handleSwitch}
          showHome={this.state.showHome}
          showVisitor={this.state.showVisitor}
        />
        <SelectFormContainer 
          teamNames={this.state.teams.keys()}
          closeCheckbox={this.toggleCheckbox}
          handleSelectTeam={this.handleSelectTeam}
          showCheckbox={this.state.showCheckbox}
        />
        <InputContainer 
          handleDataInput={this.handleDataInput}
          input={this.state.input}
          onTextInputChange={this.handleTextInput}
          generateDataButtonClick={this.generateSampleData}
                        
        />
        <AlertBox 
          open={this.state.showAlertBox} 
          onClose={this.handleAlertBoxClose}
          title="Incorrect Input Format"
          content="Try Sample Data First!"
          buttonDisplay="Got it!"
        />
      </div>
    )
  }
}

export default App;
