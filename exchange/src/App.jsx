import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/notify'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency);
    document.title="exchange"
    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...');
      axios //db is not used 
        .get(`https://open.er-api.com/v6/latest/${currency}`, { timeout: 5000 }) // 5 seconds timeout
        .then(response => {
          setRates(response.data.rates)
          if(!response.data.rates){
            setErrorMessage(`Failed to fetch exchange rates for ${currency}`);
            setTimeout(()=>setErrorMessage(null),5000)
          } 
          setValue('')  
          setCurrency(null)       
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <br/>
      <Notification message={errorMessage}></Notification>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App