require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'castError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next (error)
}

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
  ]


app.use(express.json())

app.use(cors())

app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Puhelin luettelo</h1>')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    const personsLength = persons.length
    response.send(`
      <p>Phonebook has info for ${personsLength} person</p> 
      <p>${new Date}</p>`)
  })
  .catch(error => next(error))
}) 

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const id = Math.floor(Math.random() * 1000)

  return String(id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body


  if(!body.name) {
    return response.status(400).json({error: 'name missing'})
  }
  
  if(!body.number) {
    return response.status(400).json({error: 'number missing'})
  }
  /*
  if (persons.find(person => person.name === body.name)){
    return response.status(403).json({error: 'name must be unique'})
  }
    */
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

  //persons = persons.concat(person)

  //response.json(person)

  //console.log(persons.length)
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)
  
  const person = {
    number: body.number
  }
  

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})