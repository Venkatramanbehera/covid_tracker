import React, { useState, useEffect }  from 'react'
import './app.css'

import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core'
import axios from 'axios'
import InfoBox from './InfoBox'
import Table from './Table'
import LineGraph from './LineGraph'

import { sortData } from './util'
import BarGraph from './BarGraph'

const App = (props) => {

  const [ countries, setCountries ] = useState([])
  const [ country, setCountry ] = useState('worldwide')
  const [ countryInfo, setCountryInfo ] = useState({})
  const [ tableData, setTableData ] = useState([])

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        setCountryInfo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[]) 

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        const countries = res.data.map((country) => {
          return {
            name : country.country,
            value : country.countryInfo.iso2
          }
        })
        const sortedData = sortData(res.data)
        setTableData(sortedData)
        setCountries(countries)
      })
      .catch((err) => {
        console.log(err)
      })
  },[])

  const handleSelect = (e) => {
    const countryCode = e.target.value
    const url = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    axios.get(url)
      .then((res) => {
        setCountry(countryCode)
        setCountryInfo(res.data)
      })
  }

  
  return (
      <div className = "app">
        <div className="app__left">
            <div className="app__header">

              <h1>COVID 19 TRACKER</h1>

              <FormControl className="app__dropdown" variant='outlined'>
                  <Select value={country} onChange={ handleSelect } >
                    <MenuItem value="worldwide">WorldWide</MenuItem>
                    {
                      countries.map((country,i) => {
                        return <MenuItem 
                          value={ country.value } 
                          key={ i }>{ country.name }</MenuItem>
                      })
                    }
                  </Select>
              </FormControl>


            </div>
            
            <div className="app__stats">
              <InfoBox 
                title="coronavirus cases" 
                cases={ countryInfo.todayCases} 
                total={ countryInfo.cases }/>

              <InfoBox 
                title="recovered" 
                cases={ countryInfo.todayRecovered} 
                total={ countryInfo.recovered}/>

              <InfoBox 
                title="death" 
                cases={ countryInfo.todayDeaths} 
                total={ countryInfo.deaths }/>

            </div>
            {/* Vactine information */}

            <div className="vaccine__informAtion">
              <h1>COVID 19 VACTINE INFORMATION</h1>
              {/* bargraph of 5days vactine details */}
              <BarGraph/>
            </div>
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>WorldWide New Cases</h3>
            <LineGraph caseType="cases"/>
          </CardContent>
        </Card>
      </div>
  )
}

export default App
