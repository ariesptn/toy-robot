const fs = require('fs')

class ToyRobot {
    constructor(filePath) {
        this.filePath = filePath
        this.xMax = 4
        this.yMax = 4
        this.xPos = 0
        this.yPos = 0
        this.heading = 0
        this.commands = []
        this.robotIsPlaced = false
    }

    place(paramsStr) {
        if (!paramsStr) {
            throw new Error('Invalid PLACE command')
        }
        let params = paramsStr.split(',')
        let xPos = params[0]
        let yPos = params[1]
        let headingStr = params[2]
        if (!isNaN(xPos) && !isNaN(yPos)) {
            if (xPos < 0 || yPos < 0 || xPos > this.xMax || yPos > this.yMax) {
                throw new Error('Out of bound position in PLACE command')
            }
            this.xPos = +xPos
            this.yPos = +yPos
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
        this.robotIsPlaced = true
        //onsole.log('place', this.xPos, this.yPos, this.heading)
    }

    move() {
        let xPos = this.xPos + 1 * Math.sin(this.heading * Math.PI / 180)
        let yPos = this.yPos + 1 * Math.cos(this.heading * Math.PI / 180)
        if (Math.round(xPos) >= 0 &&
            Math.round(yPos) >= 0 &&
            Math.round(xPos) <= this.xMax &&
            Math.round(yPos) <= this.yMax) {
            this.xPos = xPos
            this.yPos = yPos
        }
        //console.log('move', this.xPos, this.yPos, this.heading)
    }

    left() {
        this.heading -= 90
        if (this.heading <= 0) {
            this.heading += 360
        }
        //console.log('left', this.heading)
    }

    right() {
        this.heading += 90
        if (this.heading > 360) {
            this.heading -= 360
        }
        //console.log('right', this.heading)
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
        console.log(`${Math.round(this.xPos)},${Math.round(this.yPos)},${faceStr}`)
    }

    readFile() {
        return fs.readFileSync(this.filePath, 'utf-8')
    }

    execute() {
        this.commands = this.readFile().split(/\r?\n/)
        for (const command of this.commands) {
            if (command.slice(0, 5) === 'PLACE') {
                this.place(command.split(' ')[1])
            } else if (command === 'MOVE' && this.robotIsPlaced) {
                this.move()
            } else if (command === 'LEFT' && this.robotIsPlaced) {
                this.left()
            } else if (command === 'RIGHT' && this.robotIsPlaced) {
                this.right()
            } else if (command === 'REPORT' && this.robotIsPlaced) {
                this.report()
            } else if (command.trim() === '') {
            } else {
                throw new Error('Unknown command')
            }
        }
    }
}

let example = new ToyRobot('example.txt')
example.execute()

