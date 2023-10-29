import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryInfo = ({country}) => {
  const [countryData, setCountryData] = useState(null)


  console.log(`get data of ${country}`)
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLocaleLowerCase()}`)
        .then(response => {
          setCountryData(response.data)
        })
    },[])  

  console.log(countryData)

  if (countryData) {
    return (
      <p>
      {countryData.name.common}
      {countryData.capital[0]}
      {countryData.area}
      
      </p>
  )
  } else {
    return (
      <></>
    )
  }
    
}

export default CountryInfo