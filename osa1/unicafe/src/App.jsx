import { useState } from 'react'

const Header = ({headerTxt}) => (
  <h2>{headerTxt}</h2>
)

const DisplayStats = ({good, neutral, bad}) => (
  <div>
    <p>
      good {good}
      <br/>
      neutral {neutral}
      <br/>
      bad {bad}
    </p>
  </div>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // const headerTxt = "give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = () => setGood(good + 1)
  const countNeutral = () => setNeutral(neutral + 1)
  const countBad = () => setBad(bad + 1)

  return (
    <div>
      <Header headerTxt="give feedback"/>
      <Button
        handleClick={countGood}
        text="good" />
      <Button
        handleClick={countNeutral}
        text="neutral" />
      <Button
        handleClick={countBad}
        text="bad" />
      <Header headerTxt="statistics" />
      <DisplayStats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
