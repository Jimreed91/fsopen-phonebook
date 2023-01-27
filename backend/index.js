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
//Mongo setup
const mongoose = require('mongoose')

const password = "mhXhjIqQGHnKjGZ7"
const url =
`mongodb+srv://jimreed91:${password}@cluster0.kyqu9pk.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
}, {versionKey: false })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  //following the exercise not sure why id being implemented like this
  const id = Math.floor(Math.random() * 999)
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

  if(persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'contact name already exists'
    })
  }
    const person = request.body
    person.id = id

    persons = persons.concat(person)
    response.json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
