const ToDoTask = require('../models/todotask')

module.exports = {
  getEdit: (req, res) => {
    const id = req.params.id
    ToDoTask.find({}, (err, tasks) => {
      res.render('edit.ejs', {
        todoTasks: tasks, idTask: id})
    })
  },
  deleteTask: (req, res) => {
    const id = req.params.id
    ToDoTask.findByIdAndRemove(id, err => {
      if (err) return res.status(500).send(err)
      res.redirect('/')
    })
  },
  updateTask: (req, res) => {
    const id = req.params.id
    ToDoTask.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content
      },
      err => {
        if (err) return res.status(500).send(err)
        res.redirect('/')
      }
    )
  }
}