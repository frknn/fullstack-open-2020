import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from "./PersonForm"
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }, [])

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