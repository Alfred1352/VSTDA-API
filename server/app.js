const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
// add your code here
let initialData = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
},
{
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
}
]

app.get('/', (req, res) => {
  res.status(200).send({status: 'ok'});
});

app.get('/api/todoItems', (req, res) => {
  res.status(200).send(initialData);
});

app.get('/api/todoItems/:number', (req, res) => {
  const todoItem = initialData.find(item => item.todoItemId === parseInt(req.params.number));
  if (todoItem) {
    res.status(200).send(todoItem);
    console.log(`Get index number ${initialData.indexOf(todoItem)}`);
  } else {
    res.status(404).send({error: 'Item not found'});
  }
});

app.post('/api/todoItems', (req, res) => {
  const existingIndex = initialData.findIndex(item => item.todoItemId === req.body.todoItemId);
  if (existingIndex !== -1) {
    initialData[existingIndex] = req.body;
  } else {
    initialData.push(req.body);
  }
  res.status(201).send(req.body);
});

app.delete('/api/todoItems/:number', (req, res) => {
  const todoItemIndex = initialData.findIndex(item => item.todoItemId === parseInt(req.params.number));
  if (todoItemIndex !== -1) {
    const deletedItem = initialData.splice(todoItemIndex, 1)[0];
    res.status(200).send(deletedItem);
  } else {
    res.status(404).send({error: 'Item not found'});
  }
});

app.listen(8484, () => {
  console.log("Listening on port 8484");
});

module.exports = app;