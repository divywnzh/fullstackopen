const CountryList=({FilteredCountries, handleCountryDetails})=>{


  return(
    <div>
      {FilteredCountries.length > 10 ? (
        <div className='TooBig'>Too many matches, specify another filter</div>
        ):(
        FilteredCountries.map((country, index) => (
          <div key={index}>
            {country}
            <button onClick={() => handleCountryDetails(country)}>show</button>
          </div>
        ))
      )}
    </div>
  )
}

export default CountryList