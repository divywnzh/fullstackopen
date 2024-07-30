import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Masti Ram', number: '39-44-5323523', id: 2 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setsearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleSearch=(event)=>{
    setsearchName(event.target.value.toLowerCase())
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
        <div>
          filter contacts: <input value={searchName} onChange={handleSearch} />
          
        </div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'filtered' : 'all' }
        </button>
      <h2>Add New</h2>
      <form onSubmit={addContact}>
        <div>debug: {newName}</div>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} /></div>
        <div> <button type="submit">add</button> </div>
       
      </form>
      <h2>Numbers</h2>

      <div>
        {peopleToShow.map((person)=><li key={person.id}>{person.name} {person.number}</li>)}
      </div>
      ...
    </div>
  )
}

export default App