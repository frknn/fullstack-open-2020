import React from 'react'

function DisplayInfo(props) {

  return (
    <div>
      <img src={props.country.flag} alt={`${props.country.name}'s flag`} width="150px" height="150px" />
      <p><strong>capital city: </strong>{props.country.capital}</p>
      <p><strong>population: </strong>{props.country.population}</p>
      <p><strong>languages: </strong>
        {props.country.languages.map(language => language.name).join(', ')}
      </p>
    </div>
  )
}

export default DisplayInfo;