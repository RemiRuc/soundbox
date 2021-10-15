let part1 = document.getElementById("part1")
let part2 = document.getElementById("part2")
let container1 = document.getElementById("container1")
let container2 = document.getElementById("container2")

let turnStep = 0
let circleArray = []
let inverted = false
let prot = 0

class Circle{
    constructor(part, color){
        this.part = part
        this.el = document.createElement('div')
        this.size = 0
        this.el.classList.add('circle')
        this.el.style.background = color
        if (part == 1) {
            container1.appendChild(this.el)
        } else {
            container2.appendChild(this.el)
        }
    }

    remove(){
        if (this.part == 1) {
            this.el.style.opacity = 0
            //container1.removeChild(this.el)
        } else {
            this.el.style.opacity = 0
            //container2.removeChild(this.el)
        }
        var index = circleArray.indexOf(this.el);
        if (index > -1) {
            circleArray.splice(index, 1);
        }
    }

    resize(){
        this.size += 2
        this.el.style.transform = "scale("+this.size+")"
        if (this.size >= 80) {
            this.remove()
        }
    }
}

function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)


        if (frequencyData[15] > 130 || frequencyData[3] > 200) {
            if (inverted) {
                circleArray.push(new Circle(1, 'black'))
                circleArray.push(new Circle(2, 'white'))
            } else {
                circleArray.push(new Circle(1, 'white'))
                circleArray.push(new Circle(2, 'black'))
            }
            inverted = !inverted
        }
    

    /*if (moy >= 30) {
        let t = ran(-2, 4)
        if (t == 0) {
            t = 1
        }
        turn(t)
    }*/

    if (circleArray.length >= 200) {
        circleArray = []
        container1.innerHTML = ""
        container2.innerHTML = ""
    }

    circleArray.forEach(el => {
        el.resize()
    })

    requestAnimationFrame(renderFrame);
    
}

function turn(turn) {
    turnStep += turn
    turnStep = closure(turnStep, 0, 7)
    console.log(turnStep)
    let startWidth1
    let endWidth1
    let startHeight1
    let endHeight1

    let startWidth2
    let endWidth2
    let startHeight2
    let endHeight2
    switch (turnStep) {
        case 0:
            startWidth1 = 0
            endWidth1 = 50
            startHeight1 = 0
            endHeight1 = 100

            startWidth2 = 50
            endWidth2 = 100
            startHeight2 = 0
            endHeight2 = 100

            container2.style.justifyContent = "left"
            container2.style.alignItems = "center"
            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"
            break;
        case 1:
            startWidth1 = 0
            endWidth1 = 100
            startHeight1 = 0
            endHeight1 = 50

            startWidth2 = 0
            endWidth2 = 100
            startHeight2 = 50
            endHeight2 = 100

            container2.style.justifyContent = "center"
            container2.style.alignItems = "start"
            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"

            break;

        case 2:
            startWidth1 = 50
            endWidth1 = 100
            startHeight1 = 0
            endHeight1 = 100

            startWidth2 = 0
            endWidth2 = 50
            startHeight2 = 0
            endHeight2 = 100

            container1.style.justifyContent = "left"
            container1.style.alignItems = "center"
            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"

            break;

        case 3:
            startWidth1 = 0
            endWidth1 = 100
            startHeight1 = 50
            endHeight1 = 100

            startWidth2 = 0
            endWidth2 = 100
            startHeight2 = 0
            endHeight2 = 50

            container1.style.justifyContent = "center"
            container1.style.alignItems = "start"
            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"
            break;
            case 4:
            startWidth1 = 0
            endWidth1 = 50
            startHeight1 = 0
            endHeight1 = 100

            startWidth2 = 50
            endWidth2 = 100
            startHeight2 = 0
            endHeight2 = 100

            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"
            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"
            break;
        case 5:
            startWidth1 = 0
            endWidth1 = 100
            startHeight1 = 0
            endHeight1 = 50

            startWidth2 = 0
            endWidth2 = 100
            startHeight2 = 50
            endHeight2 = 100

            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"
            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"

            break;

        case 6:
            startWidth1 = 50
            endWidth1 = 100
            startHeight1 = 0
            endHeight1 = 100

            startWidth2 = 0
            endWidth2 = 50
            startHeight2 = 0
            endHeight2 = 100

            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"
            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"

            break;

        case 7:
            startWidth1 = 0
            endWidth1 = 100
            startHeight1 = 50
            endHeight1 = 100

            startWidth2 = 0
            endWidth2 = 100
            startHeight2 = 0
            endHeight2 = 50

            container1.style.justifyContent = "center"
            container1.style.alignItems = "center"
            container2.style.justifyContent = "center"
            container2.style.alignItems = "center"
            break;
    }

    part1.style.top = startHeight1 + "vh"
    part1.style.bottom = endHeight1 + "vh"
    part1.style.left = startWidth1 + "vw"
    part1.style.right = endWidth1 + "vw"

    part2.style.top = startHeight2 + "vh"
    part2.style.bottom = endHeight2 + "vh"
    part2.style.left = startWidth2 + "vw"
    part2.style.right = endWidth2 + "vw"

    part1.style.width = Math.abs(startWidth1 - endWidth1) + "vw"
    part1.style.height = Math.abs(startHeight1 - endHeight1) + "vh"
    part2.style.width = Math.abs(startWidth2 - endWidth2) + "vw"
    part2.style.height = Math.abs(startHeight2 - endHeight2) + "vh"
}

document.addEventListener("click", ()=>{

})

function load(){
    let t = ran(-2, 4)
    turn(t)
    setInterval(()=>{
        let t = ran(-2, 4)
        if (t == 0) {
            t = 1
        }
        turn(t)
    }, 1600)
}