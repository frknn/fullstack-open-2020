import React from 'react'

function Person(props) {
  return (
    <div>
      <p>{props.name} - {props.number}</p>
    </div>
  )
}

export default Person;