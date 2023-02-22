//Dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')
const breads = require('./breads_controller.js')

//Make a GET route that goes to  /data/seed
baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
    .then(res.redirect('/breads'))
})

// Index
baker.get('/', (req, res) =>{
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//SHOW
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
    .populate('breads')
    .then(foundBaker  => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})


//Export
module.exports = baker