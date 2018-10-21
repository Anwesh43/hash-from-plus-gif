const w = 500, h = 500
const nodes = 5
const Canvas = require('canvas').Canvas
const GifEncoder = requie('gifencoder')
class State {
    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb : Function) {
        this.scale += 0.05 * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating() {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
        }
    }
}
