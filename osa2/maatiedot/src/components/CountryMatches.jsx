import CountryInfo from "./CountryInfo"

const ListCountries = ({countries}) => {
  return (
    <>
    {countries.map(country =>
      <p key={country}>
        {country}
      </p>  
    )}
    </>
  )
}

const CountryMatches = ({searchValue, allCountries}) => {
  const foundCountries = allCountries.filter((element) => (
  element.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())))
  // console.log(allCountries)
  // console.log(foundCountries)

  if (foundCountries.length > 10) {
    return (
      <p>
      Too many matches, specify another filter
      </p>
       
    )
  } else if (foundCountries.length <= 10 && foundCountries.length > 1) {
    return (
      <>
        <ListCountries countries={foundCountries}/>
      </>
    )
  } else if (foundCountries.length === 1) {
    return (
      <p>
      <CountryInfo country={foundCountries[0]}/>
      </p>
    )
  } else {
    return (
      <>
      </>
    )
  }  
}

export default CountryMatches