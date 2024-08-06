import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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
    document.title="Phonebook"
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      console.log('Initiallized... promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

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
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const alreadyExists = persons.find(person => JSON.stringify(person.name) === JSON.stringify(personObject.name));
    if(alreadyExists){ {/* update contact */}
      if(window.confirm(`${newName} already exists in phonebook, replace the old number with a new one?`))
        personService
        .update(alreadyExists.id,personObject)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== alreadyExists.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else if(persons.some(person => JSON.stringify(person.number) === JSON.stringify(personObject.number))){
      alert(`The number ${newNumber} already exists in phonebook`)
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
          console.log(`added ${returnedPerson.name} contact ${returnedPerson.number}`)
          setNewName('')
          setNewNumber('')
        })
   } 
  }

  const DeleteContact = (id,name) => {
    if (window.confirm(`Delete ${name} ?`))
      personService
        .remove(id)
        .then(removedPerson => {
          console.log(`deleted ${removedPerson.name}`)
          setPersons(persons.filter(person => person.id!==removedPerson.id))
        })
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
      <h2>Numbers</h2> {/* direct passing here but call by reference in Numbers {()=>{handleDelete}} */}
        <Numbers peopleToShow={peopleToShow} handleDelete={DeleteContact} /> 
      ...
    </div>
  )
}

export default App