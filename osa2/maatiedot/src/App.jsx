import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchField from './components/SearchField'
import CountryMatches from './components/CountryMatches'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState(null)

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

  // Maahaun tapahtumankäsittelijä
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    const found = allCountries.filter((element) => (
      element.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())))
    if (found.length === 1) {
      setSelected(found[0])
    } else {
      setSelected('')
    }
  }

  const handleSelection = (country) => {
    setSelected(country)
  }

  // Näytettävien maannimien rajaaja
  const foundCountries = allCountries.filter((element) => (
    element.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))

  return (
     <div>
      {/* hakukenttä */}
      <SearchField searchValue={searchValue} handleSearch={handleSearch}/>
      <CountryMatches foundCountries={foundCountries} handleSelection={handleSelection}/>
      <CountryInfo selected={selected}/>
     </div>
  )
}

export default App
