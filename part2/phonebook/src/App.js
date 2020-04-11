import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from "./PersonForm"
import Persons from './Persons'
import contactService from './services/contactService'

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
    let doesPersonExist = persons.filter(person => person.name === newName).length;
    let doesNumberExist = persons.filter(person => person.number === newNumber).length
    if (doesNumberExist) {
      alert('This number already exists!')
    }
    else if (doesPersonExist) {
      if (window.confirm(`${newName} already has a number in phone book. Do you want to replace the old number with the new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const newPersonObj = { ...personToUpdate, number: newNumber }
        contactService
          .updateContact(personToUpdate.id, newPersonObj)
          .then(returnedContact => setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedContact)))
          setNewName('')
          setNewNumber('')
      }
    }
    else {
      const personObject = { name: newName, number: newNumber }
      contactService
        .createContact(personObject)
        .then(createdContact => setPersons(persons.concat(createdContact)))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = id => {
    if (window.confirm('Do you really want to delete this contact?')) {
      contactService
        .deleteContact(id)
        .then(deletedContact => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  useEffect(() => {
    contactService
      .getAll()
      .then(personData => setPersons(personData))
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App