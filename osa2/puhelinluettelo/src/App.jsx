import { useState } from 'react'

const PersonsToShow = (props) => {
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterValue, setNewFilterValue] = useState('')

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
      <div>
        filter show with: <input
        value = {newFilterValue}
        onChange = {handleFilterValueChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value = {newName}
          onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input
          value = {newNumber}
          onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <PersonsToShow persons = {persons} newFilterValue = {newFilterValue}/>
      </div>
    </div>
  )

}

export default App

/*
{persons.map(person =>
          <div key = {person.name}>{person.name} {person.number}</div>
        )}
          */