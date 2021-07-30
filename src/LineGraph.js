import axios from 'axios'
import numeral from 'numeral'
import React, { useState,useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };


const buildChartData = (data, caseType='cases') => {
    const chartData = []
    let lastDataPoint;
    
    for(let date in data.cases) {
        if(lastDataPoint){
            const newDataPoint = {
                x : date,
                y : data[caseType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date]
    }
    return chartData
}

const LineGraph = ({ caseType = "cases"}) => {
    const [ data, setData ] = useState({})

    
    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
        .then( (res) => {
            const resData = res.data
            const chartData = buildChartData(resData)
            setData(chartData)
        })
        .catch( (err) => {
            console.log(err)
        })
    },[ caseType ])
    
    return (
        <div className="line__graph">
            {
                Object.keys(data).length > 0 && <Line data={ {
                    datasets : [
                        {
                            label: 'Cases',
                            data : data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension : 0.1
                        }
                    ]
                } } options={ options }/>
            }
            
        </div>
    )
}

export default LineGraph
