const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

app = express()


//Connect and start MongoDB Server
mongoose.connect('mongodb://localhost/addresses', {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error) => {
    console.error(error) 
})
db.once('open', () => {
    console.log("DB connected")
})

//Middleware
app.use(express.json())
app.use(cors())

//Routing
const addressesRouter = require('./routes/addresses')
app.use('/addresses', addressesRouter)

//Start Express Server
const PORT = 5000
app.listen(PORT, () =>
{
    console.log(`Running on port ${PORT}`)
})
