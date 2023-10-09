import { useState } from 'react'

const Header = ({headerTxt}) => (
  <h2>{headerTxt}</h2>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const ShowVotes = ({votes}) => (
  <p>Has {votes} votes</p>
)

const App = () => { 
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let initPoints = Array(anecdotes.length).fill(0) 
  const [selected, setSelected] = useState(0)
  const selectAnecdote = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const [points, setPoints] = useState(initPoints)
  const vote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const mostVotes = () => points.indexOf(Math.max(...points))

  return (
    <div>
      <Header headerTxt="Anecdote of the day"/>
      {anecdotes[selected]}
      <br />
      <ShowVotes votes={points[selected]} />
      <Button
        handleClick={vote}
        text="vote" />
      <Button
        handleClick={selectAnecdote}
        text="next anecdote" />
      <Header headerTxt="Anecdote with most votes"/>
      {anecdotes[mostVotes()]}
      <br />
      <ShowVotes votes={points[mostVotes()]} />
    </div>
  )
}

export default App