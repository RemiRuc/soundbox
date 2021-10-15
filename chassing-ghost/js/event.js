function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function rand(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randNoFloor(min,max) // min and max included
{
    return Math.random()*(max-min+1)+min;
}
function easeInOutQuad(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }
  function easeInExpo(t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  }

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

}

document.body.addEventListener('mousemove', (event) => {
    let x = map(event.clientX, 0, window.innerWidth, 0.05, -0.05)
    let y = map(event.clientY, 0, window.innerHeight, 0.05, -0.05)
    camera.rotation.y = myCamera.rotation.y + x
    camera.rotation.x = myCamera.rotation.x + y

    if (document.querySelector("#mainScreen").style.display == "flex") {
        let x = map(event.clientX, 0, window.innerWidth, 10, -10)
        let y = map(event.clientY, 0, window.innerHeight, 10, -10)
        document.querySelector("#mainScreen").style.transform = "translate("+x+"px,"+y+"px )"
    }
})

document.body.addEventListener("click",()=>{
    spotArr.forEach(el=>{
        el.frequencyLink = rand(10,800)
    })
})

document.body.addEventListener("wheel",(event)=>{
    console.log(event)
        wall.rotation.z += 0.0005*(event.deltaY)
})

document.body.addEventListener("keydown", (event)=>{
    switch (event.which) {
        case 38:
            for (let i = 0; i < spotArr.length; i++) {
                if (i%2==0) {
                    spotArr[i].render.children[1].rotation.y += 0.1 
                } else {
                    spotArr[i].render.children[1].rotation.y -= 0.1 
                }
            }
            break;
    
        case 40:
            for (let i = 0; i < spotArr.length; i++) {
                if (i%2==0) {
                    spotArr[i].render.children[1].rotation.y -= 0.1 
                } else {
                    spotArr[i].render.children[1].rotation.y += 0.1 
                }
            }
            break;

        case 37:
        for (let i = 0; i < spotArr.length; i++) {
            if (i%2==0) {
                spotArr[i].render.children[0].rotation.y += 0.1 
            } else {
                spotArr[i].render.children[0].rotation.y -= 0.1 
            }
        }
        break;
    
        case 39:
            for (let i = 0; i < spotArr.length; i++) {
                if (i%2==0) {
                    spotArr[i].render.children[0].rotation.y -= 0.1 
                } else {
                    spotArr[i].render.children[0].rotation.y += 0.1 
                }
            }
            break;
        default:
            break;
    }
})

function start() {
    audioSource.start()
    musicPlayed = true
    currentTime = 0
}

document.querySelector("#mainScreen h1").addEventListener("click", ()=>{
    document.querySelector("#mainScreen").style.display = "none"
    document.querySelector("#lyrics").style.display = "flex"
    start()
})