let can = document.getElementById('can')
var ctx = can.getContext("2d")

let arrayCircle = []
let rotate = 0

class Circle{
    constructor(x, y, pos){
        this.radius = 50
        this.pos = pos
        this.r = 0
        this.g = 0
        this.b = 0
        this.x = x
        this.y = y
        this.draw()
    }

    update(val){
        this.radius = map(val,0,255,0,500)
        this.draw()
    }

    draw(){
        ctx.save()

        this.r = map(Math.cos((Date.now() - this.pos) * 0.0005), -1, 1, 0, 255)
        this.g = map(Math.cos((Date.now() - this.pos) * 0.00001), -1, 1, 0, 255)
        this.b = map(Math.cos((Date.now() - this.pos) * 0.0001), -1, 1, 0, 255)

        ctx.beginPath();
        ctx.translate(this.x, this.y)
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},0.2)`
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore()
    }
}

arrayCircle.push(new Circle(window.innerWidth/2, window.innerHeight, 0))
arrayCircle.push(new Circle(window.innerWidth, (window.innerHeight/2), 1000))
arrayCircle.push(new Circle(0, (window.innerHeight/2), 10000))

can.width = window.innerWidth
can.height = window.innerHeight

function renderFrame() {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
    ctx.restore()

    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    // carré
    
    arrayCircle.forEach(el => {
        el.update(moy)
    })

    rotate += 0.3
    let scale = map(moy,0,255,1,2)
    s.style.transform = `rotateZ(${rotate}deg) scale(${scale})`

    requestAnimationFrame(renderFrame);
    
}
let s = document.getElementById('square')

function load(){
    s.style.display = "block"
}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
})