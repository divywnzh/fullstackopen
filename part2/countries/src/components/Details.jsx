const Details=({countryDetails,weather})=>{
  return (
    <>
    <h1>{countryDetails.name.common}</h1>
    <div>capital {countryDetails.capital}</div>
    <div>area {countryDetails.area}</div>
    <h3>languages:</h3>
    <ul>
      {Object.values(countryDetails.languages).map((language,index) => (
        <li key={index}>{language}</li>
      ))}
    </ul>
    <img className="flag" src={countryDetails.flags.png} alt={`Flag of ${countryDetails.name.common}`} />
    <h2>Weather in {countryDetails.capital}</h2>
    <div>temperature {weather.main.temp} Celcius</div>
    <img className="weather" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather icon for ${weather.weather[0].description}`} />
    <div>wind {weather.wind.speed} m/s</div>
    </>
  )
}

export default Details