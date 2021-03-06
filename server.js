const express = require('express');
const data = require('./data.json');
require('dotenv').config();
const port = 3000;

const app = express()

app.use(express.json())

app.listen(port, () => {console.log("Server is now listening on " + port)})

// +++++++ ENDPOINTS +++++++ \\

app.get('/api/items' , (req, res) => {
  if(req.query.id){
    return res.status(200).send(data.filter(item => item.id === +req.query.id))
  }
  res.status(200).send(data)
})

app.post('/api/add_item' , (req, res) => {
  // QUICK NOTE: The code below essentially says, "if req.body is truthy, then data.push(req.body)."
  req.body && data.push(req.body)
  res.status(200).send(data)
})

app.put('/api/update/:id' , (req, res) => {
  let itemIndex = data.indexOf(item => item.id === +req.params.id)
  data.splice(itemIndex , 1 , req.body)
  res.status(200).send(data)
})

app.delete('/api/delete/:id' , (req, res) => {
  let itemIndex = data.findIndex(item => item.id === +req.params.id);
  if(itemIndex !== -1){
    data.splice(itemIndex , 1)
    res.status(201).send(data)
  } else {
    res.sendStatus(409)
  }
})
