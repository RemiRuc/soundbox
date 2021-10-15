function ran(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  function ranFloat(min, max) {
    min = min
    max = max
    return Math.random() * (max - min) + min;
  }
  function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


  function closure(val, min, max) {
    if (val > max) {
        val = min
    } else if (val < min) {
        val = max
    }
    return val
  }

  //load sound
let audioCtx, analyser, source, frequencyData
var audioBuffer;
var audioSource;
const play = document.querySelector('#load')
document.getElementById("load").addEventListener("click", ()=>{
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    loadSound('audio.mp3')
    
    play.innerHTML = 'Loading...'
    play.style.cursor = "wait"
    play.disabled = true
      
})

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {

        audioCtx.decodeAudioData(request.response, function(buffer) {

            // success callback
            audioBuffer = buffer;

            // Create sound from buffer
            audioSource = audioCtx.createBufferSource();
            audioSource.buffer = audioBuffer;

            // connect the audio source to context's output
            audioSource.connect( analyser )
            analyser.connect( audioCtx.destination )

            // play sound
            renderFrame()
            audioSource.start()
            load()
            document.getElementById("load").style.display = "none"
            


        }, function(){

            // error callback
            //
        });
    }
    request.send();
}