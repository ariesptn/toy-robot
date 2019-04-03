const { ToyRobot } = require('./toyRobot.js')

let filePath = process.argv[2]
let example = new ToyRobot(filePath)
example.execute()
