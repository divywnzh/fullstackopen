import { useState, useEffect } from 'react'
import axios from 'axios'

import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleSearch=(event)=>{
    setSearchName(event.target.value.toLowerCase())
  }
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

   if(persons.some(person => JSON.stringify(person.number) === JSON.stringify(noteObject.number))){
      alert(`The number ${newNumber} already exists in phonebook`)
   }else{
    console.log(newName)
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
   } 
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName))
  const peopleToShow = showAll
    ? persons
    : filteredPersons

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter searchName={searchName} handleSearch={handleSearch} showAll={showAll} setShowAll={setShowAll} />
      <h2>Add New</h2>
        <PersonForm newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} addContact={addContact} />
      <h2>Numbers</h2>
        <Numbers peopleToShow={peopleToShow} />
      ...
    </div>
  )
}

export default App