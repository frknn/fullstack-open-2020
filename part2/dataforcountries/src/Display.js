import React from 'react'
import DisplayOne from './DisplayOne'
import DisplayInfo from './DisplayInfo'


function Display(props) {
  const { countries } = props

  if (countries.length > 10) return <p>too many matches, specify another filter</p>
  else if (countries.length > 1) {
    return (
      countries.map(country => <DisplayOne key={country.name} country={country} showDetails={false} />)
    )
  } else if (countries.length === 1) {
    return (
      <>
        <h2>{countries[0].name}</h2>
        {/* {<DisplayInfo country={countries[0]} />} */}
        <DisplayOne key={countries[0].name} country={countries[0]} showDetails={true} />
      </>
    )
  } else {
    return <div></div>
  }
}

export default Display;
