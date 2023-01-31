require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
const app = express()
//express json parser used to parse incoming data (POST to add person)
app.use(express.json())
//serve the static frontend build
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(cors())
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const Person = require('./models/person')
// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]
//Get api info at current time
app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`
  )
})
//Get all phonebook entries

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
//Get single phonebook entry

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(400).end()
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })

  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedNote => {
      response.json(savedNote)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
app.use(unknownEndpoint)
