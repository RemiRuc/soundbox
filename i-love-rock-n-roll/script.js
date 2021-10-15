let can = document.getElementById('can')
var ctx = can.getContext("2d")

let arrayBar = []
let barNbr = 18
let step = (Math.PI*2)/barNbr

let x0 = window.innerWidth/2
let y0 = window.innerHeight/2
let r = 250

let deg = 0

can.width = window.innerWidth
can.height = window.innerHeight

class Bar{
    constructor(x, y){
        this.x = x
        this.y = y
        this.r = 10

        this.red = 0
        this.blue = 0
        this.draw()
    }

    update(val, i){
        this.r = map(val,0,255, 0,30)

        this.red = map(Math.cos((Date.now() + i*100) * 0.01), -1, 1, 150, 255)
        this.blue = map(Math.cos((Date.now() + i*100) * 0.005), -1, 1, 150, 255)

        this.draw()
    }

    draw() {
        ctx.save()

        ctx.translate(this.x, this.y)
        ctx.fillStyle = `rgb(255, 255, 255)`
        ctx.beginPath()
        ctx.arc(0, 0, (this.r+5), 0, 2 * Math.PI)
        ctx.fill()
        ctx.fillStyle = `rgb(${this.red}, 150, ${this.blue})`
        ctx.beginPath()
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI)
        ctx.fill()



        ctx.restore()
    }
}
for (let i = 0; i < barNbr; i++) {
    let x = x0 + r*Math.cos(step*i)
    let y = y0 + r*Math.sin(step*i)

    arrayBar.push(new Bar(x, y))
    
}

function renderFrame() {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "rgba(255,255,255,0.09)"
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
    ctx.restore()

    deg += 0.1
    can.style.filter = "hue-rotate("+deg+"deg)"

    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    for (let i = 0; i < arrayBar.length; i++) {
        arrayBar[i].update(frequencyData[i], i)
        
    }

    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.strokeStyle = `rgb(255, 255, 255)`
    ctx.beginPath()
    let r = map(moy, 0, 255, 3, 400)
    ctx.arc(window.innerWidth/2, window.innerHeight/2, r, 0, 2 * Math.PI)
    ctx.stroke()


    ctx.restore()

    requestAnimationFrame(renderFrame);
    
}

function load(){

}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
})