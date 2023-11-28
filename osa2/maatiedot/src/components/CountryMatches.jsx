const Button = ({country, handleSelection}) => (
  <button type="button"
          onClick={() => handleSelection(country)}
          text="delete">show</button>
)

const ListCountries = ({countries, handleSelection}) => {
  return (
    <>
    {countries.map(country =>
      <p key={country}>
        {country}
        <Button country={country} handleSelection={handleSelection}/>
      </p>  
    )}
    </>
  )
}

const CountryMatches = ({foundCountries, handleSelection}) => {
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
        <ListCountries countries={foundCountries} handleSelection={handleSelection}/>
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