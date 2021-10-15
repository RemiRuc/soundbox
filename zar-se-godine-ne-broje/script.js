var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('can2');
var ctx2 = canvas2.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

let arrayCircle = []
let arrayWave = []
let block = false
let block2 = false
let block3 = false

class Circle{
    constructor(r, opacity, color, offsetX, offsetY){
        this.r = r
        this.opacity = opacity
        this.newOpacity = opacity
        this.color = color
        this.offsetX = offsetX
        this.offsetY = offsetY
    }

    update(moy){
        this.newOpacity = map(moy, 0, 255, 0.01, 0.1 )

        this.draw()
    }

    draw(){
        let step = Math.PI / 10
        for (let i = 0; i < 10; i++) {
            ctx.save()
    
            let x= (window.innerWidth/2) + this.r*Math.cos((Date.now() - step*i*5000) * 0.0005)
            let y= (window.innerHeight/2) + this.r*Math.sin((Date.now() - step*i*5000) * 0.0005)
    
            ctx.beginPath()
            ctx.translate(x, y)
            ctx.fillStyle = 'rgba('+this.color+',100,200,'+this.newOpacity+')'
            ctx.arc(this.offsetX, this.offsetY, 50, 0, 2 * Math.PI)
            ctx.fill()
    
            ctx.restore()
        }
    }
}

class Wave{
    constructor(color){
        this.radius = 0
        this.opacity = 1
        this.color = color
        this.size = 10
    }

    update(){
        this.radius += 1
        this.opacity -= 0.001
        this.size -= 0.05
        if (this.size < 1) {
            this.size = 1
        }
        this.draw()
    }

    draw(){
        ctx2.save()

        let x= (window.innerWidth/2) 
        let y= (window.innerHeight/2)

        ctx2.beginPath()
        ctx2.lineWidth = this.size;
        ctx2.translate(x, y)
        ctx2.strokeStyle = 'rgba('+this.color+','+this.color+','+this.color+','+this.opacity+')'
        ctx2.arc(0, 0, this.radius, 0, 2 * Math.PI)
        ctx2.stroke()

        ctx2.restore()
    }
}


function renderFrame() {
    ctx.fillStyle = "rgba(100,100,100,0.01)"
    ctx.beginPath()
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()

    ctx2.clearRect(0, 0, window.innerWidth, window.innerHeight)


    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)


    /*if (moy >= 80) {
        if (!block) {
            arrayWave.push(new Wave(255))
            block = true
            setTimeout(()=>{
                block = false
            }, 4000)
        }
    }*/

    if (frequencyData[11] >= 170) {
        if (!block2) {
            arrayWave.push(new Wave(255))
            block2 = true
            setTimeout(()=>{
                block2 = false
            }, 0)
        }
    }

    /*if (frequencyData[8] >= 150) {
        if (!block3) {
            arrayWave.push(new Wave(150))
            block3 = true
            setTimeout(()=>{
                block3 = false
            }, 4000)
        }
    }*/

    arrayCircle.forEach(el=>{
        el.update(moy)
    })

    arrayWave.forEach(el=>{
        el.update()
    })

    if (arrayWave.length > 1000) {
        arrayWave.splice(0, 500)
    }

    //canvas.style.opacity = map(moy, 0, 255, 0.8, 1)
    //canvas2.style.transform = 'skewX('+map(frequencyData[10],0, 255, -30, 30)+'deg) skewY('+map(frequencyData[20],0, 255, -30, 30)+'deg)'

    requestAnimationFrame(renderFrame);
    
}

function load(){
    audioBuffer.currentTime = 9000
    for (let i = 0; i < 70; i++) {
        let opacity = ranFloat(0.01, 0.1)
        let offsetX = ranFloat(10, 200)
        let offsetY = ranFloat(10, 200)
        arrayCircle.push(new Circle(i*10, opacity, 3.33*(i+30), offsetX, offsetY))
    }
}

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas2.width = window.innerWidth
    canvas2.height = window.innerHeight
})