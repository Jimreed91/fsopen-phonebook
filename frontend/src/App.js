import { useState, useEffect } from 'react'
import personsService from './services/personsService'
import  Persons  from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  const personsToShow = showAll === true
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (event) => {
    const id = event.target.value
    if (window.confirm('Are you sure you want to delete this contact?')) {
      personsService
        .destroy(id)
        .then( response =>
          setPersons(persons.filter(person => person.id !== id))
        )
   }
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(person => person.name === newName)
    if (typeof person === 'undefined') {

      personsService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

        setErrorMessage(`Person ${personObject.name} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    } else {

      if (window.confirm(`${person.name} is already saved, update their number?`)){
        const updatedPerson = {...person, number: newNumber}
        setNewName("")
        setNewNumber("")
        personsService
          .update(person.id, updatedPerson)
          .then(response => {

            setPersons(persons.map(p => p.id !== response.id ? p : response ))
            setErrorMessage(`Person ${updatedPerson.name} updated`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Person ${updatedPerson.name} was already deleted`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter handleFilter={handleFilter}/>

      <PersonForm
        handleNewName={handleNewName}
        newName={newName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />

      <Persons
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
