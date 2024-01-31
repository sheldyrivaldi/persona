const express = require('express')
const router = express.Router()
router.use(express.json())

const {Homepage} = require('../controllers/homepage')

router.get('/homepage', Homepage)

module.exports = router