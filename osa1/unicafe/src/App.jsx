import { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1> {props.header}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {

  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good +1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral +1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad +1)}>
        bad
      </button>
      <h1>statistic</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>

    </div>
  )
}

export default App