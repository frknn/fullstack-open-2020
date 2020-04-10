import React, { useState, useEffect } from 'react'
import DisplayInfo from './DisplayInfo'

function DisplayOne(props) {

  const [showInfo, setShowInfo] = useState(props.showDetails)
  console.log(showInfo)

  const handleClick = async (e) => {
    setShowInfo(!showInfo)
  }

  useEffect(() => setShowInfo(props.showDetails), [props.showDetails])

  if (showInfo) {
    return (
      <>
        {props.country.name}
        <input type="button" onClick={handleClick} value="hide details" />
        <br />
        <DisplayInfo country={props.country} />
      </>
    )
  } else {
    return (
      <>
        {props.country.name}
        <input type="button" onClick={handleClick} value="show details" />
        <br />
      </>
    )
  }
}

export default DisplayOne;
