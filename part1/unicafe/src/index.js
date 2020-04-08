import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
  return (
    <input type="button" value={props.text} onClick={props.handleClick} />
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>{text}: {text === "positive" ? value + "%" : value}</p>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positve = (good / (good + neutral + bad)) * 100;

  if (all) {
    return (
      <>
        <table>
          <thead><h2>statistics</h2></thead>
          <tbody>
            <tr><td><Statistic text="good" value={good} /></td></tr>
            <tr><td><Statistic text="neutral" value={neutral} /></td></tr>
            <tr><td><Statistic text="bad" value={bad} /></td></tr>
            <tr><td><Statistic text="all" value={all} /></td></tr>
            <tr><td><Statistic text="average" value={average} /></td></tr>
            <tr><td><Statistic text="positive" value={positve} /></td></tr>
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given yet.</p>
      </>
    )
  }

}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //handlers
  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={incrementGood} />
      <Button text="neutral" handleClick={incrementNeutral} />
      <Button text="bad" handleClick={incrementBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

