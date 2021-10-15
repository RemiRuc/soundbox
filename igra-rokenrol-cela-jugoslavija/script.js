let can = document.getElementById('can')
var ctx = can.getContext("2d")

let arrayBar = []

class Bar{
    constructor(y){
        this.y = y
        this.yOffset = 0
        this.i = ran(0,31)
         this.draw()
    }

    update(val){
        this.y += 0.6
        this.yOffset = map(val, 0,255,-10,10)

        this.y = closure(this.y, 0, window.innerHeight)

        this.draw()
    }

    draw(){
        ctx.save()

        ctx.translate(0, this.y + this.yOffset)
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.rect(0,0,window.innerWidth,2)
        ctx.fill()

        ctx.restore()
    }
}

for (let i = 0; i < window.innerHeight/20; i++) {
    arrayBar.push(new Bar(i*20))
    
}

function renderFrame() {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.clearRect(0,0,window.innerWidth,window.innerWidth)
    ctx.fill()

    ctx.restore()
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    arrayBar.forEach(el=>{
        el.update(frequencyData[el.i])
    })

    let deg = Math.cos(Date.now()*0.002)*20
    document.getElementById('bg').style.transform = 'rotate('+deg+'deg)'

    requestAnimationFrame(renderFrame);
    
}

function load(){
    setTimeout(()=>{
        document.getElementById('can').style.transform = 'rotate('+ran(-365,365)+'deg) scale(1.2)'
        setInterval(() => {
            document.getElementById('can').style.transform = 'rotate('+ran(-365,365)+'deg) scale(1.2)'
        }, 1800);
    }, 3700)
}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
})