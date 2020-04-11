import React from 'react'

function Person(props) {
  return (
    <div>
      <p style={{display:"inline"}}>{props.name} - {props.number}</p>
      <button onClick={() => props.handleDelete(props.id)}>delete</button>
    </div>
  )
}

export default Person;