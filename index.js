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
    const queueJobsNumber = await tasksManager.getJobCounts()

    res.json(queueJobsNumber)
})

app.get('/tasks/:id', async (req, res) => {
    const job = await tasksManager.getById(req.params.id)

    res.send(`Task state for ${job.id} - ${await job.getState()}. Progress - ${await job.progress()}. Result - ${JSON.stringify(job.returnvalue)}.`)
})

app.listen(PORT, () => console.log(`Queue manager listening on port ${PORT}!`))
