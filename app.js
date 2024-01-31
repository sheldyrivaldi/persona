const express = require('express')
const app = express()

// Routes
const homepage = require('./routes/homepage')
const prompt = require('./routes/prompt')

app.use("/", homepage)
app.use("/", prompt)


module.exports = app