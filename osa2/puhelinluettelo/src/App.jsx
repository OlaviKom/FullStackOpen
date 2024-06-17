import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = (props) => {
  if (props.newName === ''){
    return (
      props.persons.map(person =>
        <div key = {person.name}>{person.name} {person.number}</div>
      )
    )
  } else {
    const filteredPersons = props.persons.filter(person=> person.name.toLowerCase().includes(props.newFilterValue.toLowerCase()))
    return(
      filteredPersons.map(person =>
        <div key = {person.name}>{person.name} {person.number}</div>
      )
    )
  }
}

const Filter = (props) => {
  return (
    <div>
      filter shown whit: <input
      value = {props.newFilterValue}
      onChange = {props.handleFilterValueChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value = {props.newName}
          onChange = {props.handleNameChange}
          />
        </div>
        <div>
          number: <input
          value = {props.newNumber}
          onChange = {props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterValue, setNewFilterValue] = useState('')

  useEffect(() => {
    console.log('effects')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterValueChange = (event) => {
    console.log(event.target.value)
    setNewFilterValue(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personsNames = persons.map((person) => person.name)
    if(personsNames.includes(newName)){
      alert(`${newName} is all ready in phonebook`)
    }else {
      const personObject = {
        name: newName
      }
      personObject.number = newNumber
      setPersons(persons.concat(personObject))
    } 
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterValue = {newFilterValue} handleFilterValueChange = {handleFilterValueChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson} 
        newName = {newName} handleNameChange = {handleNameChange}
        newNumber = {newNumber} handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons = {persons} newFilterValue = {newFilterValue}/>
    </div>
  )

}

export default App
