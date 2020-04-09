import React from 'react'

function Header(props) {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

function Content(props) {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} coursename={part.name} exercises={part.exercises} />)}
    </div>
  )
}

function Part(props) {
  return (
    <div>
      <p>{props.coursename}: {props.exercises}</p>
    </div>
  )
}

function Total(props) {
  let totalExercises = props.parts.map(part => part.exercises).reduce((a, b) => a + b)
  return (
    <div>
      <p>Total number of exercises: {totalExercises}</p>
    </div>
  )
}

function Course(props) {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course;