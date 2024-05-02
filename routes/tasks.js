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
  res.json(tasks)
});

router.post('/addTasks', function(req, res, next) {
  let nextId = getNextId('task_', tasks)
  tasks.push({
    id: nextId,
    type: 'task',
    ...req.body
  })
  res.json(tasks)
});

router.delete('/removeTasks/:id', function(req, res, next) {
  const item = tasks.find((task) => task.id === req.params.id)
  const indexItem = tasks.indexOf(item)
  if (indexItem >= 0) {
    tasks.splice(indexItem, 1)
  }
  res.json(tasks)
});

module.exports = router;
