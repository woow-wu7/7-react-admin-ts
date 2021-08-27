/* tslint-disable */
const express = require('express')
const app = express()
const port = 5678

app.get('/good', (req, res) => {
  // res.send('Hello World!')
  setTimeout(() => res.send('message'), 4000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:5678`)
})
/* eslint-disable */
