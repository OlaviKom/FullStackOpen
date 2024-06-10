import { useState } from 'react'

const Statistic = ({good, neutral, bad, all}) => {
  if (all === 0){
    return (
      <div>
        no feedback given
      </div>
    )
  } else {
    return(
      <div>
        <StatisticLine text = 'good' value = {good}/>
        <StatisticLine text = 'neutral' value = {neutral}/>
        <StatisticLine text = 'bad' value = {bad}/>
        <StatisticLine text = 'all' value = {all}/>
        <StatisticLine text = 'average' value = {((good*1)+(bad*-1))/all}/>
        <StatisticLine text = 'positive' value = {(good/all)*100} sign = '%'/>
      </div>
    )
  }
}

const Button = (props) => {
  return(
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return(
    <div>
      {props.text} {props.value} {props.sign}
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [allFeedbacks, setAll] = useState([])
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    //setAll(allFeedbacks.concat(1))
    setAll(all +1)
    setGood(good +1)
  }

  const handleNeutralClick = () => {
    //setAll(allFeedbacks.concat(0))
    setAll(all +1)
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    //setAll(allFeedbacks.concat(-1))
    setAll(all +1)
    setBad(bad +1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = 'good'/>
      <Button handleClick={handleNeutralClick} text = 'neutral'/>
      <Button handleClick={handleBadClick} text = 'bad'/>
      <h1>statistic</h1>
      <Statistic good = {good} neutral = {neutral} bad = {bad} all = {all} />
        
    </div>
  )
  
}

export default App

