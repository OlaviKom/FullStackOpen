import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const addName = (event) => {
    const personsNames = persons.map((person) => person.name)
    if(personsNames.includes(newName)){
      alert(`${newName} is all ready in phonebook`)
    }else {
      event.preventDefault()
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value = {newName}
          onChange = {handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <div key = {person.name}>{person.name}</div>
        )}
      </div>
    </div>
  )

}

export default App