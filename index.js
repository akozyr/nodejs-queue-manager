const express = require('express')
const bodyParser = require('body-parser')

const TasksManager = require('./src/TasksManager')

const PORT = 3000

const tasksManager = new TasksManager()
tasksManager.init()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/tasks', async (req, res) => {
    const job = await tasksManager.add(req.body)

    res.send(`Task ${job.id} accepted.`)
})

app.get('/tasks', async (req, res) => {
    const processingJobsNumber = await tasksManager.count()

    res.send(`Currently running ${processingJobsNumber} jobs.`)
})

app.listen(PORT, () => console.log(`Queue manager listening on port ${PORT}!`))
