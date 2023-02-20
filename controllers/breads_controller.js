const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('index', {
          breads: foundBreads,
          title: 'Index Page'
        })
      })
    })

  // CREATE POST
  breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
      req.body.hasGluten = 'true'
    } else {
      req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
  })

  // NEW --this section must above SHOW, otherwise will show 404, bcz the [new] is not is the bread_data
  breads.get('/new', (req, res) => {
    res.render('new')
  })


  // SHOW route
  breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id) 
      .then(foundBread => {
        res.render('show', {
            bread: foundBread,
            index: req.params.id
        })
      })
      .catch(err => {
        res.send('404')
      })
    })



  //CREATE DELETE
  breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
    .then(deleteBread => {
      res.status(303).redirect('/breads')
    })
  })

  //CREATE UPDATE Route
  breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedBread => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.id}`)
    })
  })

  //CREATE EDIT
  breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread
    })   
    })
  })


  module.exports = breads