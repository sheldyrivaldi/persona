const express = require('express')
const router = express.Router()
router.use(express.json())

const {GetPersonaByInstagram, GetFeedsInstagram} = require('../controllers/prompt')

router.post('/prompt', GetPersonaByInstagram)
router.post('/feeds', GetFeedsInstagram)

module.exports = router