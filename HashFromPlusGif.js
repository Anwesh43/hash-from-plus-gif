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

    update(cb) {
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

class HFPNode {
    constructor(i) {
        this.i = i
        this.state = new State()
        this.addNeighbor()
    }

    addNeighbor() {
        if (this.i < nodes - 1) {
            this.next = new HFPNode(this.i + 1)
            this.next.prev = this
        }
    }

    draw(context) {
        const gap = w / (nodes + 1)
        const size = (2 * gap) / 3
        const kGap = size / 3
        context.lineWidth = Math.min(w, h) / 60
        context.lineCap = 'round'
        context.strokeStyle = '#43A047'
        context.save()
        context.translate(gap * this.i + gap, h/2)
        for (var j = 0; j < 2; j++) {
            const sc = Math.min(0.5, Math.max(0, this.state.scale - 0.5 * j)) * 2
            context.save()
            context.rotate((Math.PI/2 - Math.PI/4 * sc))
            for(var k = 0; k < 2; k++) {
                context.beginPath()
                context.moveTo(-size/2, (1 - 2 * k) * kGap * sc)
                context.lineTo(size/2, (1 - 2 * k) * kGap * sc)
                context.stroke()
            }
            context.restore()
        }
        context.restore()
    }

    update(cb) {
        this.state.update(cb)
    }

    startUpdating() {
        this.state.startUpdating()
    }

    getNext(dir, cb) {
        var curr = this.prev
        if (dir == 1) {
            curr = this.next
        }
        if (curr) {
            return curr
        }
        cb()
        return this
    }
}
