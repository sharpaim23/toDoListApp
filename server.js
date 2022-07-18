//npm init
//npm install express mongoose dotenv cors
//npm install nodemon --save-dev
// "start": "nodemon server.js" -package.json

//Declare variables
const express = require('express')
const app = express()
const PORT = 8000
const mongoose = require('mongoose')
require('dotenv').config()
const ToDoTask = require('./models/todotask')

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Connect to Mongo
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true }, () => { console.log('Connected to db!') }
)

//Get Methods
app.get("/", async (req, res) => {
    try {
        ToDoTask.find({}, (err, tasks) => {
            res.render("index.ejs", { todoTasks: tasks });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});

//Post Methods
app.post('/', async (req, res) => {
  const todoTask = new ToDoTask(
    {
      title: req.body.title,
      content: req.body.content
    }
  )
  try {
    await todoTask.save()
    console.log(todoTask);
    res.redirect('/')
  } catch (err) {
    if (err) return res.status(500).send(err)
    res.redirect('/')
  }
})

// Edit or Update Methods
app
  .route('/edit/:id')
  .get((req, res) => {
    const id = req.params.id
    ToDoTask.find({}, (err, tasks) => {
      res.render('edit.ejs', {
        todoTasks: tasks, idTask: id})
      })
  })
  .post((req, res) => {
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
    })

// Delete Methods
app
  .route('/remove/:id')
  .get((req, res) => {
    const id = req.params.id
    ToDoTask.findByIdAndRemove(id, err => {
      if (err) return res.status(500).send(err)
      res.redirect('/')
    })
  })

app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))


