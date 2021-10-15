const loadedIndicator = document.querySelector('.loaded-indicator')
const loadedNumbers = document.querySelectorAll('.loaded-number span')

const startBtn = document.querySelector('.start-btn')
const introCircle = document.querySelector('.intro-circle')
const loadingCircle = document.querySelector('.loading-circle')

let thingsLoaded = 0;

let thingsToLoad = 0;

let everithingIsLoaded = false;

SLUGS.forEach(slug => {
    var req = new XMLHttpRequest();
    req.open('GET', '/preview/'+slug.title+'.mp4', true);
    req.setRequestHeader('Cache-Control', 'max-age=31536000');
    req.responseType = 'blob';

    thingsToLoad++;

    req.onload = function() {
        if (this.status === 200) {
            console.log(slug.title)

            const textSlidersLoaded = document.querySelectorAll('.text-slider p.'+slug.title)
            textSlidersLoaded.forEach(textSliderLoaded => {
                textSliderLoaded.classList.add('loaded')
            })

            thingsLoaded++

            loadedNumbers.forEach(span => {
                console.log(span.style.transform)
                span.style.transform = 'translateY(-'+(thingsLoaded * 100)+'%)'
            })
        } else if (this.status === 404) {
            
        }

        if (thingsToLoad == thingsLoaded) {
            everithingIsLoaded = true

            loadedIndicator.classList.add('hide')
            introCircle.disabled = false
            loadingCircle.classList.add('ready');
        }
    }
    req.onerror = function() {
        
    }

    req.send();
});