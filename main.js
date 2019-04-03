const fs = require('fs')

class ToyRobot {
    constructor(filePath) {
        this.filePath = filePath
        this.xSize = 5
        this.ySize = 5
        this.xPos = 0
        this.yPos = 0
        this.heading = 0
        this.commands = []
        this.execute()
    }

    place(paramsStr) {
        if (!paramsStr) {
            throw new Error('Invalid PLACE command')
        }
        let params = paramsStr.split(',')
        let xPos = parseInt(params[0])
        let yPos = parseInt(params[1])
        let headingStr = params[2]
        if (xPos && yPos) {
            this.xPos = xPos
            this.yPos = yPos
        } else {
            throw new Error('Invalid X or Y in PLACE command')
        }
        if (headingStr === 'NORTH') {
            this.heading = 360
        } else if (headingStr === 'EAST') {
            this.heading = 90
        } else if (headingStr === 'SOUTH') {
            this.heading = 180
        } else if (headingStr === 'WEST') {
            this.heading = 270
        } else {
            throw new Error('Invalid heading in PLACE command')
        }
        console.log('place', this.xPos, this.yPos, this.heading)
    }

    move() {
        this.xPos = this.xPos + 1 * Math.cos(this.heading)
        this.yPos = this.yPos + 1 * Math.sin(this.heading)
        console.log('move', this.xPos, this.yPos, this.heading)
    }

    left() {
        this.heading -= 90
        if (this.heading <= 0) {
            this.heading += 360
        }
        console.log('left', this.heading)
    }

    right() {
        this.heading += 90
        if (this.heading > 360) {
            this.heading -= 360
        }
        console.log('right', this.heading)
    }

    report() {
        let faceStr = 'ERROR'
        if (this.heading === 360) {
            faceStr = 'NORTH'
        } else if (this.heading === 90) {
            faceStr = 'EAST'
        } else if (this.heading === 180) {
            faceStr = 'SOUTH'
        } else if (this.heading === 270) {
            faceStr = 'WEST'
        }
        console.log(`${this.xPos},${this.yPos},${faceStr}`)
    }

    readFile() {
        return fs.readFileSync(this.filePath, 'utf-8')
    }

    execute() {
        this.commands = this.readFile().split(/\r?\n/)
        for (const command of this.commands) {
            if (command.slice(0, 5) === 'PLACE') {
                this.place(command.split(' ')[1])
            } else if (command === 'MOVE') {
                this.move()
            } else if (command === 'LEFT') {
                this.left()
            } else if (command === 'RIGHT') {
                this.right()
            } else if (command === 'REPORT') {
                this.report()
            } else {
                throw new Error('Unknown command')
            }
        }
    }
}

new ToyRobot('example-c.txt')

