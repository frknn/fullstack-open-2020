import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from "./PersonForm"
import Persons from './Persons'
import Notification from './Notification'
import contactService from './services/contactService'

const App = () => {

  // states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationObj, setNotificationObj] = useState({ type: null, message: '' })
  //const [notificationMsg, setNotificationMsg] = useState('')

  // handlers
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
      setNotificationObj({ type: 'error', message: 'This number already exists!' })
      setTimeout(() => {
        setNotificationObj({ type: null, message: '' })
      }, 3000);
    }
    else if (doesPersonExist) {
      if (window.confirm(`${newName} already has a number in phone book. Do you want to replace the old number with the new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const newPersonObj = { ...personToUpdate, number: newNumber }
        contactService
          .updateContact(personToUpdate.id, newPersonObj)
          .then(returnedContact => setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedContact))).catch(err => {
            setNotificationObj({ type: 'error', message: 'An error occured when updating!' })
            setTimeout(() => {
              setNotificationObj({ type: null, message: '' })
            }, 3000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
            
          })
        setNotificationObj({ type: 'success', message: 'Number updated!' })
        setTimeout(() => {
          setNotificationObj({ type: null, message: '' })
        }, 3000);
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      const personObject = { name: newName, number: newNumber }
      contactService
        .createContact(personObject)
        .then(createdContact => setPersons(persons.concat(createdContact)))
      setNotificationObj({ type: 'success', message: `${newName} successfully added to the phonebook!` })
      setTimeout(() => {
        setNotificationObj({ type: null, message: '' })
      }, 3000);
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = id => {
    if (window.confirm('Do you really want to delete this contact?')) {
      contactService
        .deleteContact(id)
        .then(deletedContact => setPersons(persons.filter(person => person.id !== id))).catch(err => {
          setNotificationObj({ type: 'error', message: 'An error occured when deleting contact' })
          setTimeout(() => {
            setNotificationObj({ type: null, message: '' })
          }, 3000);
        })
      setNotificationObj({ type: 'success', message: 'Number successfully deleted!' })
      setTimeout(() => {
        setNotificationObj({ type: null, message: '' })
      }, 3000)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  // fetch data only after first render
  useEffect(() => {
    contactService
      .getAll()
      .then(personData => setPersons(personData))
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationObj.type} message={notificationObj.message} />
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