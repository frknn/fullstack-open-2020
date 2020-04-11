import React from 'react'
import Person from './Person'

function Persons(props) {
  return (
    <div>
      {props.persons.map(person =>
        <div key={person.id} style={{display:"inline"}}>
          <Person key={person.name} id={person.id} name={person.name} number={person.number} handleDelete={props.handleDelete}/>
        </div>
      )}
    </div>
  )
}

export default Persons
