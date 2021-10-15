let can = document.getElementById('can')
var ctx = can.getContext("2d")

can.width = window.innerWidth
can.height = window.innerHeight

let block = false

let arrayImg = []
let arrayShape = []
for (let i = 1; i < 6; i++) {
    let img = new Image()
    img.src = i + ".png"
    arrayImg.push(img)
}

class Shape{
    constructor(i){
        this.img = ran(0,4)
        this.y = ran(0, window.innerHeight)
        this.x = window.innerWidth
        this.vy = ranFloat(-1,1)
        this.vx = ranFloat(-2,-1)
        this.r = 0
        this.i = i
        this.size = 100
        this.vr = ranFloat(-0.01,0.01)
        this.draw()
    }

    update(val) {
        this.x += this.vx
        this.y += this.vy
        this.r += this.vr
        this.size = map(val, 0, 255, 80, 120)
        this.draw()
    }

    draw() {
        ctx.save()

        ctx.translate(this.x, this.y)
        ctx.rotate(this.r)
        ctx.drawImage(arrayImg[this.img],0,0,this.size,this.size)

        ctx.restore()
    }
}

function renderFrame() {
    ctx.beginPath()
    ctx.fillStyle = "rgba(4,12,26,0.1)"
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

        // WHITE CIRCLE
        ctx.save()

        ctx.translate(window.innerWidth*1.1, window.innerHeight/2)
        ctx.beginPath()
        ctx.arc(0,0,map(moy, 0, 255, 0, window.innerHeight/2)*2,0,2 * Math.PI)
        ctx.strokeStyle = "#ffffff"
        ctx.fillStyle = "#ffffff"
        //ctx.fill()
        ctx.stroke()
    
        ctx.restore()


    if (moy >= 120) {
        if (!block) {
            arrayShape.push(new Shape(ran(0,31)))
            block = true
            setTimeout(()=>{block=false}, 1000)
        }
    }

    arrayShape.forEach(el => {
        el.update(frequencyData[el.i])
    })

    if (arrayShape.length >= 100) {
        arrayShape.splice(0, 50)
    }


    requestAnimationFrame(renderFrame);
    
}

function load(){

}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
})