import { useState } from 'react'


const Statistic = (props) => {
  return(
    <div>
      {props.name} {props.stats} {props.sign}
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

  if (all === 0){
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistic</h1>
      <div>no feedback given</div>
    </div>
  )
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <h1>statistic</h1>
        <Statistic name = 'good' stats = {good}/>
        <Statistic name = 'neutral' stats = {neutral}/>
        <Statistic name = 'bad' stats = {bad}/>
        <Statistic name = 'all' stats = {all}/>
        <Statistic name = 'average' stats = {((good*1)+(bad*-1))/all}/>
        <Statistic name = 'positive' stats = {(good/all)*100} sign = '%'/>
      </div>
    )
  }  
}

export default App

//<Average allFeedbacks = {allFeedbacks}/>

/*
//kokeilu
const Average = (props) => {
  const sum = props.allFeedbacks.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const avg = sum/props.allFeedbacks.length

  return (
    <div>
      <p> average {avg}</p>
    </div>
  )
}
*/