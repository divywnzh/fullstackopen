const Details=({countryDetails})=>{
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
    </>
  )
}

export default Details