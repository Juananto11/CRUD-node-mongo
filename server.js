const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
let db

app.set('view engine', 'pug')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

MongoClient.connect('mongodb://Juananto11:aria1703@ds113169.mlab.com:13169/devsha', (err, client) => {
  if (err) return console.log(err)

  db = client.db('devsha')

  app.listen(3000, () => console.log('Escuchando en el http://localhost:3000'))
})

app.get('/', (req, res) => {
  db
    .collection('user')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.pug', {users: result})
    })
})

app.post('/users', (req, res) => {
  db
    .collection('user')
    .save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('Base de Datos Guardada')
      res.redirect('/')
    })
  console.log(req.body)
})

app.put('/users', (req, res) => {
  db
    .collection('user')
    .findOneAndUpdate(
      {name: 'Juan Garcia'},
      {
        $set: {
          name: req.body.name,
          email: req.body.email
        }
      },
      {
        upsert: true
      },
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
})

app.delete('/users', (req, res) => {
  db
    .collection('user')
    .findOneAndDelete(
      {name: req.body.name},
      (err, result) => {
        if (err) return res.send(500, err)
        res.send({message: `${req.body.name} ha sido borrado`})
      }
    )
})
