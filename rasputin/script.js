let can = document.getElementById('can')
var ctx = can.getContext("2d")

can.width = window.innerWidth
can.height = window.innerHeight

let circleSize = 0


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

    let circeSize2=map(moy, 0, 255, 0, 500)   
    circleSize -= 1
    if (circeSize2 >= circleSize) {
        circleSize = circeSize2
    } else if (circleSize <= 0) {
        circleSize = 0
    }
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#2b7896'
    ctx.translate(window.innerWidth/2, window.innerHeight/2)
    ctx.arc(0,0,circleSize, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()

       //circe
       ctx.save()
       ctx.beginPath()
       ctx.fillStyle = '#0b4860'
       ctx.translate(window.innerWidth/2, window.innerHeight/2)
       ctx.arc(0,0,circeSize2, 0, 2 * Math.PI)
       ctx.fill()
       ctx.restore()

              //circe
              ctx.save()
              ctx.beginPath()
              ctx.fillStyle = '#f9db43'
              ctx.translate(window.innerWidth/2, window.innerHeight/2)
              ctx.arc(0,0,(circleSize/2), 0, 2 * Math.PI)
              ctx.fill()
              ctx.restore()

                //circe
                ctx.save()
                ctx.beginPath()
                ctx.fillStyle = '#000000'
                ctx.translate(window.innerWidth/2, window.innerHeight/2)
                ctx.arc(0,0,5, 0, 2 * Math.PI)
                ctx.fill()
                ctx.restore()

                                //circe
                                ctx.save()
                                ctx.beginPath()
                                ctx.fillStyle = '#f9db43'
                                ctx.translate(window.innerWidth/2, window.innerHeight/2)
                                ctx.arc(300*Math.cos(Date.now()*0.001),300*Math.sin(((Date.now()+Math.PI)*0.001)+Math.PI),map(moy,0,255,10,30), 0, 2 * Math.PI)
                                ctx.fill()
                                ctx.restore()

                                //circe
                                ctx.save()
                                ctx.beginPath()
                                ctx.fillStyle = '#f9db43'
                                ctx.translate(window.innerWidth/2, window.innerHeight/2)
                                ctx.arc(350*Math.cos(Date.now()*0.001),350*Math.sin(Date.now()*0.001),map(moy,0,255,10,30), 0, 2 * Math.PI)
                                ctx.fill()
                                ctx.restore()

                                //circe
                                ctx.save()
                                ctx.beginPath()
                                ctx.fillStyle = '#f9db43'
                                ctx.translate(window.innerWidth/2, window.innerHeight/2)
                                ctx.arc(400*Math.cos((Date.now()+100000)*0.0025),400*Math.sin(((Date.now()+100000)*0.0025)+Math.PI),map(moy,0,255,10,30), 0, 2 * Math.PI)
                                ctx.fill()
                                ctx.restore()

    requestAnimationFrame(renderFrame);
    
}

function load(){

}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
})