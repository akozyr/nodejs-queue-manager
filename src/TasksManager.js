const Queue = require('bull')
const uuidv4 = require('uuid/v4')

module.exports = class TasksManager {
    constructor () {
        this._manager = new Queue('tasks processing', {
            redis: {
                port: 6379, host: 'redis'
            }
        })
    }

    init() {
        this._manager.process(async (task) => {
            async function heavyLogic(task) {
                console.log(task.id, task.data)

                return new Promise((resolve) => {
                    setTimeout(() => {
                        task.progress(25)
                        setTimeout(() => {
                            task.progress(50)
                            setTimeout(() => {
                                task.progress(75)
                                setTimeout(() => {
                                    task.progress(100)
                                    resolve({ specificResponse: { someData: true } })
                                }, 3000)
                            }, 3000)
                        }, 3000)
                    }, 3000)
                })
            }

            return await heavyLogic(task)
        })
    }

    async add(data) {
        return this._manager.add(data, { jobId: uuidv4() })
    }

    async getJobCounts() {
        return this._manager.getJobCounts()
    }

    async getById(id) {
        return this._manager.getJob(id)
    }
}
