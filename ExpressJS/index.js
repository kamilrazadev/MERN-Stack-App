const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.SERVER_PORT;
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api', require('./api/category/Router'))
app.use('/api', require('./api/brands/Router'))
app.use('/api', require('./api/users/Router'))
app.use('/api', require('./api/products/Router'))

app.get('/start', (req, res) => {
  res.json({
    message : "Hello World"
  })
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})