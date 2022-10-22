const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://skyadmin:${password}@cluster0.t6lmx.mongodb.net/backtest?retryWrites=true&w=majority`

const userSchema = new mongoose.Schema({
  name: String,
  number: String
})

const User = mongoose.model('User', userSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
  }).catch(err => console.log(err))

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 3) {
  User.find({}).then(result => {
    result.forEach(user => {
      console.log(`${user.name} ${user.number} \n`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else if (process.argv.length === 5) {
  const user = new User({
    name: process.argv[3],
    number: process.argv[4]
  })

  user.save().then(result => {
    console.log(`added ${user.name} number ${user.number} to phonebook`)
    mongoose.connection.close()
  })

    .catch((err) => console.log(err))
} else {
  console.log('wrong number of arguments')
  process.exit(1)
}
