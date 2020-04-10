import React from 'react'
import Person from './Person'

function Persons(props) {
  return (
    <div>
      {props.persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default Persons
