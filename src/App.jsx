import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/entries'
import Notification from './components/Notification'

const App = () => {
  

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setNewSearchValue] = useState('')
  const [match, setMatch] = useState(false)
  const [not, setNot] = useState(null)
  const [isError, setError] = useState(false)
  

  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault() 
    if (newName === "") {
      return
    }  
    console.log(persons)
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    console.log(duplicate)
    if (!duplicate) {
      let newObject = {name: newName, number: newNumber}
      phonebookService
        .create(newObject)
        .then(createdEntry => {
            setPersons(persons.concat(createdEntry))
            setError(false)
            setNot(`Added ${newObject.name}`)
            setTimeout(() => {
              setNot(null)
            }, 5000)
        })
    } else { 
      let person 
      persons.forEach(p => {
        if (p.name.toLowerCase() === newName.toLowerCase()) {
          person = p
        }
      })
      console.log(person)
      if (person.number !== newNumber) {  
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          phonebookService
            .update(person.id, { name: person.name, number: newNumber })
            .then(response => {
              setError(false)
              setPersons(persons.filter(p => p.id != person.id).concat(response))
              setNot(`${response.name} has been changed to ${response.number}`)
              setTimeout(() => {
                setNot(null)
              }, 5000)
            })
            .catch(() => {
              setNot(`Information of ${newName} has already been removed from server`)
              setError(true)
              setTimeout(() => setNot(null), 5000)
            })
        }
      } else {
        alert(`${newName} at ${newNumber} is already in your phonebook`)
      }
    }  
    setNewName('')
    setNewNumber('')  
  }

  const handleSearch = (event) => {    
    const value = event.target.value.toLowerCase()
    setMatch(false)
    setNewSearchValue(value)
    // add functionality that matches
    persons.map(person => {
      if (person.name.toLowerCase().includes(value) && value !== '') {
        setMatch(true)
        return     
      } 
    })
  }

  const handleDeletion = (id) => {
    console.log("deleting entry", id)
    phonebookService
        .deleteEntry(id)
        .then(response => {
          setPersons(persons.filter(person => person.id != response.id))
        })
        .catch(() => {
          alert(`the note ${id} was deleted`)
        })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={not} isError={isError} />
      <Filter text='Search Phonebook' inputValue={searchField} onChange={handleSearch} phonebook={persons} match={match} />
      
      <h2>Add a new entry</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} 
                  numberValue={newNumber} onNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} handleDeletion={handleDeletion} /> 
              
    </div>
  )
}


export default App
