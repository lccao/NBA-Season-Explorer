import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Chart = ({selectedTeams, showVisitor, showHome}) => {
    let series = [];

    selectedTeams.forEach(team => {
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
            ];
        }

        series = [
            ...series,
            {
                name: team.name,
                data: team_data,
            }
        ]
    })

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
    <div className='chart'> 
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
    )
}

export default Chart;