require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({ origin: true }));

const routes = require('./routes/routes')
routes(app)

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})