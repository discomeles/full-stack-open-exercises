import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchField from './components/SearchField'
import CountryMatches from './components/CountryMatches'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
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

  // Toisella efektillä haetaan maakohtainen data

  // Maahaun tapahtumankäsittelijä
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  // Näytettävien maannimien rajaaja
  // const foundCountries = allCountries.filter((element) => (
  //   element.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))

  return (
     <div>
      {/* {console.log(allCountries)} */}
      {/* hakukenttä */}
      <SearchField searchValue={searchValue} handleSearch={handleSearch}/>
      <CountryMatches searchValue={searchValue} allCountries={allCountries}/>
     </div>
  )
}

export default App
