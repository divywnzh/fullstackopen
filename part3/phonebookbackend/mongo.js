const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name=process.argv[3]
const number=process.argv[4]

const url =
  `mongodb+srv://notesapp:${password}@notesapp.wg2my.mongodb.net/PhoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', contactSchema)

if (process.argv.length===3){
    Person.find({})
    .then(result => {
        result.forEach(person => {
          console.log(person.name+' '+person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5){

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save()
    .then(result => {
        console.log('added '+person.name+' '+person.number+' to phonebook')
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the correct number of arguments: node mongo.js <password> [name] [number]')
    process.exit(1)
}