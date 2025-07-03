const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('tinyDinger', (tokens, req, res) => {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-', 
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (req.method === 'POST') {
    log += " " + JSON.stringify(req.body)
  }

  return log
})

app.use(morgan('tinyDinger'))
app.use(morgan("tiny"))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
  res.send("<h1>Phonebook</h1>")
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    const date = Date.now()    
    res.send(`<h2>Phonebook has info for ${persons.length} people</h2>\n<h2>${new Date(date).toString()}</h2> `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    const person = persons.find(person => person.id === id)

    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id    
    const personIndex = persons.findIndex(person => person.id === id)

    if (personIndex >= 0) {
      console.log(persons)
      res.json(persons[personIndex])
      persons.splice(personIndex, 1)
      console.log(persons)
    } else {
      res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const createId = () => {
      const max = 10000
      const min = 0
      return Math.floor(Math.random() * (max - min + 1) ) + min
    }

    const person = req.body
    if (!('name' in person) || !("number" in person) ) {
      res.status(400).json({ error: 'Either a name, number, or both fields are missing' })
      return 
    }
    const isDuplicate = persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())

    if (isDuplicate) {      
      console.log('duplicate')
      res.status(409).json({ error: 'name must be unique' })
    }else {
      console.log(createId(), 'creating entry...')
      person.id = createId()
      persons.push(person)
      console.log(person, "has been added.\n", persons)
      res.json(person)
    }
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server is running on port ${PORT}...` ) )
