import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Header(props) {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

function Content(props) {
  return (
    <div>
      <Part coursename={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part coursename={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part coursename={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

function Total(props) {
  return (
    <div>
      <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )

}

function Part(props) {
  return (
    <div>
      <p>{props.coursename} {props.exercises}</p>
    </div>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


