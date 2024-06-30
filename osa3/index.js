const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()



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
  response.json(persons)
})

app.get('/info', (request, response) => {
  const personsLength = persons.length
  response.send(`
    <p>Phonebook has info for ${personsLength}</p> 
    <p>${new Date}</p>`)
}) 

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  } else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  console.log(persons)
  const id = request.params.id
  console.log(`deleting ${id}`)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()

  console.log(persons)
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

  if (persons.find(person => person.name === body.name)){
    return response.status(403).json({error: 'name must be unique'})
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)

  console.log(persons.length)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})