import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchField from './components/SearchField'
import CountryMatches from './components/CountryMatches'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState('')
  const [countryData, setCountryData] = useState(null)

  // Haetaan ensin kaikkien maiden lista, ja tallennetaan
  // nimet tilaan
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const nameData = response.data.map(country => country.name.common)
          setAllCountries(nameData)
        })
  },[])

  // Haetaan maakohtainen data
  const getCountryData = (country) => {
    console.log(`get data of ${country}`)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLocaleLowerCase()}`)
        .then(response => {
          console.log(response.data)
        })
  }

  // Maahaun tapahtumankäsittelijä
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const setCountry = (value) => {
    setSelected(value)
  }

  // Näytettävien maannimien rajaaja
  const foundCountries = allCountries.filter((element) => (
    element.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))



  return (
     <div>
      {/* {console.log(allCountries)} */}
      {/* hakukenttä */}
      <SearchField searchValue={searchValue} handleSearch={handleSearch}/>
      <CountryMatches foundCountries={foundCountries}/>
      {foundCountries.length === 1 ?
         <CountryInfo country={foundCountries[0]} getCountryData={getCountryData}/> : <></>}
     </div>
  )
}

export default App
