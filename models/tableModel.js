var mongoose = require('mongoose')

const tableInit = mongoose.model('tasks_and_goals', { name:String, description:String, due_date:String, type:String }, 'tasks_and_goals')

module.exports = tableInit
