const chai = require('chai')
const expect = chai.expect
const { ToyRobot } = require('./toyRobot.js')

describe('toy robot test', () => {
    it('example a', () => {
        const toyRobot = new ToyRobot('example-a.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`0,1,NORTH`)
    })

    it('example b', () => {
        const toyRobot = new ToyRobot('example-b.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`0,0,WEST`)
    })

    it('example c', () => {
        const toyRobot = new ToyRobot('example-c.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`3,3,NORTH`)
    })

    it('make sure robot dont fall, test 1', () => {
        const toyRobot = new ToyRobot('example-fall1.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`4,4,EAST`)
    })

    it('make sure robot dont fall, test 2', () => {
        const toyRobot = new ToyRobot('example-fall2.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`0,0,SOUTH`)
    })

    it('make sure any commands before PLACE are ignored', () => {
        const toyRobot = new ToyRobot('example-preplace.txt')
        toyRobot.execute()
        const result = toyRobot.report()
        expect(result).to.equal(`0,1,NORTH`)
    })

    it("make sure robot cannot be placed out of bound", () => {
        const toyRobot = new ToyRobot('')
        expect(toyRobot.place.bind(toyRobot, '15,15,NORTH')).to.throw()
    })
})
