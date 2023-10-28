const CountryInfo = ({country, getCountryData}) => {
    getCountryData(country)
    
    return (
        <>
        {country}
        </>
    )
}

export default CountryInfo