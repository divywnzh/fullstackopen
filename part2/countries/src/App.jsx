import { useState,useEffect } from 'react'
import axios from 'axios'


function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countryList, setCountryList]=useState([])
  const [countryDetails, setCountryDetails]=useState(null)

  document.title="Data For Countries"
  
  useEffect(()=>{
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response=>{
      setCountryList(response.data.map(country=>country.name.common))
    })
  },[])

  const handleSearch=(event)=>{
    setCountrySearch(event.target.value)
  }

  const FilteredCountries=countryList.filter(country=>country.toLowerCase().includes(countrySearch.toLowerCase()))
  useEffect(() => {
    if (FilteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${FilteredCountries[0]}`)
        .then(response => {
          setCountryDetails(response.data); // Assuming the response is an array
        })
        .catch(error => {
          console.error('Error fetching country details:', error);
        });
    }
  }, [FilteredCountries])

  return (
    <>
    <form>
      <div>find countries <input value={countrySearch} onChange={handleSearch}/> </div>
    </form>
    <div>{FilteredCountries.length>10 ? (<div className='TooBig'>Too many matches, specify another filter</div>):
      (FilteredCountries.length===1)?
        (countryDetails ? (
        <>
          <h1>{countryDetails.name.common}</h1>
          <div>capital {countryDetails.capital}</div>
          <div>area {countryDetails.area}</div>
          <h3>languages:</h3>
          <div>{Object.values(countryDetails.languages).map((language,index)=><li key={index}>{language}</li>)}</div>
          <div className="flag">{countryDetails.flag}</div>
        </>):(<div>Loading...</div>)
      ):
      (FilteredCountries.map((country,index)=><div key={index}>{country}</div>)
    )}</div>
    </>
  )
}

export default App
