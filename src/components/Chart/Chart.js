import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

/* change marker to team logo

const nameMap = {
    'Atlanta Hawks':'atl',
    'Brooklyn Nets':'bkn',
    'Boston Celtics':'bos',
    'Charlotte Hornets':'cha',
    'Chicago Bulls':'chi',
    'Cleveland Cavaliers':'cle',
    'Dallas Mavericks':'dal',
    'Denver Nuggets':'den',
    'Detroit Pistons':'det',
    'Golden State Warriors':'gsw',
    'Houston Rockets':'hou',
    'Indiana Pacers':'ind',
    'Los Angeles Clippers':'lac',
    'Los Angeles Lakers':'lal',
    'Memphis Grizzlies':'mem',
    'Miami Heat':'mia',
    'Milwaukee Bucks':'mil',
    'Minnesota Timberwolves':'min',
    'New Orleans Pelicans':'nop',
    'New York Knicks':'nyk',
    'Oklahoma City Thunder':'okc',
    'Orlando Magic':'orl',
    'Philadelphia 76ers':'phi',
    'Phoenix Suns':'phx',
    'Portland Trail Blazers':'por',
    'Sacramento Kings':'sac',
    'San Antonio Spurs':'sas',
    'Toronto Raptors':'tor',
    'Utah Jazz':'uta',
    'Washington Wizards': 'was'
}
*/
const Chart = (props) => {
    
    const {selectedTeams, showVisitor, showHome} = props

    let series = [];
    for (let team of selectedTeams){
    
        let team_data = []
        for (let data of team.data){
            // filter Visitor/Home game
            if (!showVisitor && !showHome) break;
            else if (showVisitor&&!showHome){
                if (!data.isVisitor) continue;
            } else if (!showVisitor && showHome){
                if (data.isVisitor) continue;
            }

            team_data = [
                ...team_data,
                [
                    Date.parse(data.date),
                    data.score
                ]
            ]
        }
        // console.log("team_data", team_data);
        series = [
            ...series,
            {
                name: team.name,
                data: team_data,
                // marker:{
                //     symbol:`url(https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${nameMap[team.name]}.png)`,
                //     height:15,
                //     width:15,
                // }
            }
        ]
    }

    const options = {
        title: {
          text: 'NBA Season Explorer'
        },
        subtitle: {
            text: 'A React Web App Created by Brandon Cao'
        },
        yAxis:{
            title:{
                text: "Score"
            }
        },
        xAxis: {
            title: {
              text: "Date"
            },
            type:"datetime",
            dateTimeLabelFormats: {
                day: '%m/%d/%y',
            },
        },
        series:series        
      }
return ( 
    <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
    </div>
    )
}

export default Chart;