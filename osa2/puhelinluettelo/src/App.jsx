import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'


const Person = ({ person, deletePerson }) => {
  
  return(
    <div> {person.name} {person.number}
    <button onClick = {() => {deletePerson(person.id)}}>delete</button> </div>
  )
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

const Notification = ({ message, type }) => {
  if(message === null){
    return null
  }
  if(type === 'succeed'){
    return(
      <div className='succeed'>
        {message}
      </div>
    )
  } else {
  return(
      <div className='error'>
        {message}
      </div>
    )
  }  
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterValue, setNewFilterValue] = useState('')

  const[notificationMessage, setNotificationMessage] = useState(null)

  const[notificationType, setNotificationType] = useState(null)

  const personsToShow = persons.filter(person=> person.name.toLowerCase().includes(newFilterValue.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


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
      const person = persons.find(p => p.name === newName)
      const changedPerson = {... person}
      changedPerson.number = newNumber
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        personService
          .update(changedPerson.id, changedPerson)
           .then((returnedPerson) => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            setNotificationMessage(`Updated ${returnedPerson.name} number`)
            setNotificationType('succeed')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
           })    
      }
    }else {
      const personObject = {
        name: newName
      }
      personObject.number = newNumber
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotificationMessage(`Added ${returnedPerson.name}`)
            setNotificationType('succeed')
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
    } 
  }

  const deletePersonOf = (id) => {
    console.log(id)
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`))
    personService
      .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id ))
          setNotificationMessage(`Deleted ${person.name}`)
          setNotificationType('succeed')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage(`information of ${person.name} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
          
        })
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type = {notificationType}/>
      <Filter newFilterValue = {newFilterValue} handleFilterValueChange = {handleFilterValueChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson} 
        newName = {newName} handleNameChange = {handleNameChange}
        newNumber = {newNumber} handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person key = {person.id} 
        person = {person} 
        deletePerson ={() => deletePersonOf(person.id)}/>
      )}
    </div>
  )
}

export default App

