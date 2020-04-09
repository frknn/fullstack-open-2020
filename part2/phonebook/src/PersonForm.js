import React from 'react'

function PersonForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input type="text" value={props.nameValue} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input type="text" value={props.numberValue} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm;
