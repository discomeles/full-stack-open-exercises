import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryInfo = ({country}) => {
  const [countryData, setCountryData] = useState(null)

  // Haetaan maakohtainen data
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLocaleLowerCase()}`)
        .then(response => {
          setCountryData(response.data)
        })
    },[])  

  if (countryData) {
    return (
      <>
      <h1>{countryData.name.common}</h1>
      <p>
      capital {countryData.capital[0]}
      <br/>
      area {countryData.area}
      </p>
      <h2>languages:</h2>
      {Object.values(countryData.languages).map(lang => 
        <li key={lang}>
          {lang}
        </li>
        )}
        <br/>
      <img src={countryData.flags.png} alt={countryData.flags.alt} height="150"/>
      </>
  )
  } else {
    return (
      <></>
    )
  }
    
}

export default CountryInfo