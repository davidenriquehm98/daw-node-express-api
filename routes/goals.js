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

const goals = []

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  res.json(goals)
});

router.post('/addGoals', function(req, res, next) {
  let nextId = getNextId('goal_', goals)
  if (req.body != null && req.body.name && req.body.description && req.body.due_date) {
    goals.push({
      id: nextId,
      type: 'goal',
      ...req.body
    })
    res.status(200).json(goals)
  } else {
    res.status(400).json({ status: 'ERROR', message: 'No se estan enviando los datos completos' })
  }
});

router.delete('/removeGoals/:id', function(req, res, next) {
  if (req.params != null && req.params.id) {
    const item = goals.find((goal) => goal.id === req.params.id)
    const indexItem = goals.indexOf(item)
    if (indexItem >= 0) {
      goals.splice(indexItem, 1)
      res.status(200).json(goals)
    } else {
      res.status(404).json({ status: 'ERROR', message: 'No se encontró el objetivo a eliminar' })
    }
  } else {
    res.status(400).json({ status: 'ERROR', message: 'No se esta enviando el parametro necesario' })
  }
});

module.exports = router;
