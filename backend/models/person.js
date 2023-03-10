const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('Connecting to... ', url)
mongoose.set('strictQuery', false);
// mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

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

module.exports = mongoose.model('Person', personSchema)
