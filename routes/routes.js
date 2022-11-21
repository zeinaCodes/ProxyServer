const express = require('express');
const router = express.Router();

const needle = require('needle')
const url = require('url')
const { fetch } =  require('undici')


// .env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


// proxy using needle
router.get('/needle', async (req, res) => {
    try {
        // parameters
        const params = new URLSearchParams({
            [API_KEY_NAME] : API_KEY_VALUE,
            'src': 'hello',
            'hl': 'en-us',
            ...url.parse(req.url, true).query
        })
        // fetching
        const response = await needle('get', `${API_BASE_URL}&${params}`)
        const data = response.body;
        console.log(data)
        res.send('check console ..')
        
  } catch (err) { 
        console.log('error: failed to fetch api:', err)
        res.status(500).json({err})
  }
    
})

// proxy using undici
router.get('/undici', async (req,res) => {
    try {
        // parameters
        const parameters = new URLSearchParams({
            [API_KEY_NAME] : API_KEY_VALUE,
            'src': 'hello',
            'hl': 'en-us',
            ...url.parse(req.url, true).query
        })
        // fetching
        const res = await fetch(`${API_BASE_URL}?${parameters}`)
        const data = await res.json()
        console.log(data)

    } catch (err) {
        console.log('error: failed to fetch api:', err)
        res.status(500).json({err})
    }
    res.send('check console ..')
})

module.exports = router;