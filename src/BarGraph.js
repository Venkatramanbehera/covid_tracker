import React,{ useState,useEffect } from 'react'
import { Card, CardContent } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };


const extractedData = (data) => {
    const result = []
    for( let d in data){
        result.push(data[d])
    }
    return result
}

const extractedDate = (data) => {
    const result = []
    for( let date in data){
        result.push(date)
    }
    return result
}

const BarGraph = (props) => {
    const [ barChartData, setBarChartData ] = useState([])
    const [ barChartDate, setBarChartDate ] = useState([])
    
    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=6&fullData=false')
        .then((res) => {
            const data = extractedData(res.data);
            setBarChartData(data)
            const date = extractedDate(res.data)
            setBarChartDate(date)
        })
        .catch((err) => {
            console.log(err.message)
        })
    },[])
    
    const data = {
        labels: barChartDate,
        datasets: [
          {
            label: 'world wide vactine taken',
            data: barChartData,
            backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <div className="bar__graph">
            <Card>
                <CardContent>
                    <Bar data={data} options={options} />
                </CardContent>
            </Card>
        </div>
    )
}

export default BarGraph
