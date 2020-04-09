import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from "./PersonForm"
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '05458547852' },
    { name: 'bruh moment', number: '05416598624' },
    { name: 'lan kirac', number: '05552279696' },
    { name: 'toprak hic', number: '05357896541' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let doesPersonExist = persons.filter(person => person.name === newName).length
      ||
      persons.filter(person => person.number === newNumber).length
    if (doesPersonExist) {
      alert('This person or number already exists!')
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <h2>add a new person</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        nameValue={newName} handleNameChange={handleNameChange}
        numberValue={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App