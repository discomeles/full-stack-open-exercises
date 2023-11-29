import axios from 'axios'
import { useState, useEffect } from 'react'

const owapi_key = import.meta.env.VITE_OWAPI_KEY

const CountryInfo = ({selected}) => {
  const [countryData, setCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  // Säädatan haku
  const getWeather = (latlng) => {
    // console.log(latlng)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${owapi_key}&units=metric`
    axios
      .get(url)
        .then(response => {
          setWeatherData(response.data)
          // console.log(response.data.main.temp)
          // console.log(response.data.wind.speed)
          // console.log(response.data.weather[0].icon)
        })
  }

  // Haetaan maakohtainen data
  useEffect(() => {
    if (selected) {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selected.toLocaleLowerCase()}`)
        .then(response => {
          setCountryData(response.data)
          getWeather(response.data.capitalInfo.latlng)
        })}
    },[selected])  

  if (countryData && weatherData) {
    return (
      <>
      <h1>{countryData.name.common}</h1>
      <p>
      capital {countryData.capital[0]}
      <br/>
      area {countryData.area}
      </p>
      <h2>languages:</h2>
      <ul>
      {Object.values(countryData.languages).map(lang => 
        <li key={lang}>
          {lang}
        </li>
        )}
      </ul>
        <br/>
      <img src={countryData.flags.png} alt={countryData.flags.alt} height="150"/>
      <h2>Weather in {countryData.capital[0]}</h2>
      <p>
        temperature {weatherData.main.temp} Celcius<br/>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /><br/>
        wind {weatherData.wind.speed} m/s 
      </p>
      </>
  )
  } else {
    return (
      <></>
    )
  }
    
}

export default CountryInfo