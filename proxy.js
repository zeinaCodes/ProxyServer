if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const proxys = require('./routes/routes')


// routes
app.use('/', proxys)

// Enable cors 
app.use(cors())

app.listen(5000 , () => console.log('Server running on port 5000'))