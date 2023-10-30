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

const CountryMatches = ({foundCountries}) => {
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
  } else {
    return (
      <>
      </>
    )
  }  
}

export default CountryMatches