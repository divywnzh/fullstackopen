import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notifciation'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {

  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    document.title="Notes"
    noteService //axios.get
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])

  if (!notes) { 
    return null 
  }
  //this will trigger rerender in case notes were not loaded still
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      //don't manually assign id -> clashes with json-server
    }

    noteService //axios.post
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf =(id)=>{

    console.log(`importance of ${id} needs to be toggled`)

    const requiredNote=notes.find(note=>note.id===id)
    const changedNote = { ...requiredNote, important: !requiredNote.important }

    noteService //axios.put
      .update(id, changedNote)
      .then(returnedNote => {
        console.log("Note changed")
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        console.log('Importance : ', changedNote.important)
      })
      .catch(error => {
        setErrorMessage(`The note '${changedNote.content}' was already deleted from server`)
        setTimeout(()=>setErrorMessage(null),5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer />
    </div>
  )
}

export default App