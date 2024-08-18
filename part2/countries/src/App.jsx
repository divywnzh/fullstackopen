import { useState,useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'


const App =()=> {
  const [countrySearch, setCountrySearch] = useState('')
  const [countryList, setCountryList]=useState([])
  const [countryDetails, setCountryDetails]=useState(null)
  const [isCountrySelected, setIsCountrySelected]=useState(false) //to prevent ineffecient re triggering of use effect

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
    setCountryDetails(null)
    setIsCountrySelected(false)
  }

  const FilteredCountries=countryList.filter(country=>country.toLowerCase().includes(countrySearch.toLowerCase()))
  
  useEffect(() => {
    if (FilteredCountries.length === 1 && !isCountrySelected) {
      handleCountryDetails(FilteredCountries[0])
    }
  }, [FilteredCountries, isCountrySelected])

  const handleCountryDetails=(countryName)=>{
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then(response=>{
      setCountryDetails(response.data)
      setIsCountrySelected(true)
    })
    .catch(error => {
      console.error('Error fetching country details:', error)
    })
  }

  return (
    <>
    <form>
      <div>find countries <input value={countrySearch} onChange={handleSearch}/> </div>
    </form>
    <div>{countryDetails ? 
    (<Details countryDetails={countryDetails}/>)
      :(FilteredCountries.length>10 ? 
        (<div className='TooBig'>Too many matches, specify another filter</div>)
          :(FilteredCountries.map((country,index)=><div key={index}>{country}<button onClick={()=>handleCountryDetails(country)}>show</button></div>)))}
    </div>
    </>
  )
}

export default App
