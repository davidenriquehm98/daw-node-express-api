var express = require('express');
var router = express.Router();

const getNextId = (prepend, list) => {
  let nextId = prepend + '1'
  let maxId = 0
  if (list.length > 0) {
    list.forEach((field) => {
      let itemId = parseInt(field.id.replace(prepend, ''))
      maxId = maxId < itemId ? itemId : maxId
    })
    nextId = `${prepend}${(maxId + 1)}`
  }
  return nextId
}

const tasks = []

/* GET home page. */
router.get('/getTasks', function(req, res, next) {
  res.status(200).json(tasks)
});

router.post('/addTasks', function(req, res, next) {
  let nextId = getNextId('task_', tasks)
  if (req.body != null && req.body.name && req.body.description && req.body.due_date) {
    tasks.push({
      id: nextId,
      type: 'task',
      ...req.body
    })
    res.status(200).json(tasks)
  } else {
    res.status(400).json({ status: 'ERROR', message: 'No se estan enviando los datos completos' })
  }
});

router.delete('/removeTasks/:id', function(req, res, next) {
  if (req.params != null && req.params.id) {
    const item = tasks.find((task) => task.id === req.params.id)
    const indexItem = tasks.indexOf(item)
    if (indexItem >= 0) {
      tasks.splice(indexItem, 1)
      res.status(200).json(tasks)
    } else {
      res.status(404).json({ status: 'ERROR', message: 'No se encontró la tarea a eliminar' })
    }
  } else {
    res.status(400).json({ status: 'ERROR', message: 'No se esta enviando el parametro necesario' })
  }
});

module.exports = router;
