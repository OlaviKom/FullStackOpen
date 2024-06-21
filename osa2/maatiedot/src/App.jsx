import { useState, useEffect } from 'react'
import axios from 'axios'

const States = ({ statesToShow }) => {

  if(statesToShow.length > 10) {
    return(
    <div>Too many matches, specify another</div>
    )
  } else if(statesToShow.length < 11 && statesToShow.length > 1){
    return(
      statesToShow.map(state => 
        <div key = {state.name.common}> {state.name.common}</div>
      )
    )
  } else if (statesToShow.length === 1){
    return(
      statesToShow.map(state => 
        <div key = {state.name.common}> 
          <h2>{state.name.common}</h2>
          <div>capital {state.capital}</div>
          <div>area {state.area}</div>
          <h4>languages:</h4>
          <ul> 
          {Object.values(state.languages).map(language => (<li key = {language}> {language}</li>))}
          </ul>
          <img 
          src = {state.flags.png}
          width={150}
          height ={150} 
          alt ="flag"/>
          </div>
        )
      )      
  } else if (statesToShow.length === 0) {
    return(
      <div>No matches</div>
      )
    }       
}

const App = () => {
  const [value, setValue] = useState('')
  const [states, setStates] = useState([])

  useEffect(() => { 
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setStates(response.data)
          console.log(response.data)
        })
  }, [])


  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const statesToShow = states.filter(state=> state.name.common.toLowerCase().includes(value.toLowerCase()))
  console.log(statesToShow.length)

  return(
    <div>
      find countries <input
      value = {value}
      onChange = {handleChange}
      />
      <States statesToShow={statesToShow}/>
    </div>
  )
}

export default App

