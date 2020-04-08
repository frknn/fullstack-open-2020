import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
  return (
    <input type="button" value={props.text} onClick={props.handleClick} />
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const voteArr = new Array(props.anecdotes.length).fill(0);
  const [votes, setVotes] = useState(voteArr);
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const fetchNextAnecdote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  const voteForAnecdote = () => {
    const copyArr = [...votes];
    copyArr[selected]++;
    setVotes([...copyArr])
    let mostVoted = copyArr.indexOf(Math.max(...copyArr))
    setMostVotedIndex(mostVoted)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br />
      has {votes[selected]} votes.
      <br></br>
      <Button text="vote" handleClick={voteForAnecdote} />
      <Button text="next anecdote" handleClick={fetchNextAnecdote} />
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[mostVotedIndex]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
