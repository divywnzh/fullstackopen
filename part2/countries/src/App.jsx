import { useState,useEffect } from 'react'
import axios from 'axios'
import Details from './components/Details'
import SearchBar from './components/SearchBar'
import CountryList from './components/CountryList'


const App =()=> {
  const [countrySearch, setCountrySearch] = useState('')
  const [countryList, setCountryList]=useState([])
  const [countryDetails, setCountryDetails]=useState(null)
  const [isCountrySelected, setIsCountrySelected]=useState(false) //to prevent ineffecient re triggering of use effect
  const [weather, setWeather] = useState(null) // New state for weather

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

      const capital=response.data.capital
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
          .then(weatherResponse => {
            setWeather(weatherResponse.data)
          })
          .catch(error => {
            console.error('Error fetching weather data:', error)
            setWeather({
              main: { temp: 'N/A' },
              weather: [{ icon: '01d', description: 'No data' }],
              wind: { speed: 'N/A' }
            })
          })

    })
    .catch(error => {
      console.error('Error fetching country details:', error)
    })
  }

  return (
    <>
    <SearchBar countrySearch={countrySearch} handleSearch={handleSearch}/>
    <div>{countryDetails && weather ? (
      <Details countryDetails={countryDetails} weather={weather} />
    ):(<CountryList FilteredCountries={FilteredCountries} handleCountryDetails={handleCountryDetails}/>)}
    </div>
    </>
  )
}

export default App
