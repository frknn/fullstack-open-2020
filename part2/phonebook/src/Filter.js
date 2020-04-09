import React from 'react'

function Filter(props) {
  return (
    <div>
      search by name:<input type="text" value={props.value} onChange={props.handleChange} />
    </div>
  )
}

export default Filter;