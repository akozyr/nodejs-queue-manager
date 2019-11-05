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
        this._manager.process((task) => {
            return Promise.resolve({ done: true})
        })
    }

    async add(data) {
        return this._manager.add(data, { jobId: uuidv4() })
    }

    async count() {
        return this._manager.count()
    }
}
