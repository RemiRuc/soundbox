//video
var video = document.getElementById("video");
var source = document.getElementById("video-source");
var canvas = document.getElementById("background-video");
var canvasContext = canvas.getContext("2d");



// Listeners

document.addEventListener("visibilitychange", handleVisibilityChange, false);
window.addEventListener('resize', resizeCanvas)
resizeCanvas()

window.addEventListener('click', ()=>{
    if (introPassed) {
        video.play()
    }
})



// Functions

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawVideo() {
    let videoHeight = window.innerHeight
    let videoWidth = window.innerHeight*16/9
    canvasContext.drawImage(video, -(videoWidth - window.innerWidth)/2, 0, videoWidth, videoHeight);
}

function videoNaviguateManager() {
    canvas.classList.add('transition')
    video.classList.add('transition')
    circleElt.classList.add('transition')
    playElt.classList.add('transition')
    descriptionElt.classList.add('transition')
    interactiveElt.classList.add('transition')
}

function handleVisibilityChange() {
    if (document.hidden && introPassed) {
        video.pause()
    } else if (!document.hidden && introPassed) {
        video.play()
    }
  }
