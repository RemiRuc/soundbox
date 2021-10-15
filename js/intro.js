let introPassed = false
const intro = document.querySelector('.intro')

const textsSlider = document.querySelector('.texts-slider')
const textSlider = document.querySelectorAll('.text-slider')

let translateIntro = -50;
let translateIntroVelocity = 0.01;

let skewIntro = 0

let rotateIntro = 0



// Listeners

document.addEventListener('mousemove', introMouseMove)

introCircle.addEventListener('click', () => {
    if (!introCircle.disabled) {
        introCircle.style.animation = 'transitionStart 2.5s cubic-bezier(0.6, -0.4, 0.45, 1) forwards';
    
        setTimeout(() => {
            introPassed = true
            intro.style.display = 'none'
            video.play()
        }, 1250);
    }
})

introCircle.addEventListener('mouseenter', () => {
    intro.style.transform = "scale(1.3)"
})

introCircle.addEventListener('mouseleave', () => {
    intro.style.transform = "scale(1)"
})



// Functions

function introAnimation() {

    translateIntro += translateIntroVelocity;

    textSlider.forEach(el => {
        el.style.transform = 'translateX('+translateIntro+'%) skewX('+skewIntro+'deg)';
    })

    textsSlider.style.transform = 'rotate3D(1,1,1,'+rotateIntro+'deg)';

    if (translateIntro >= 50) {

        translateIntro = -50

    } else if (translateIntro <= -50) {

        translateIntro = 50
    }

    requestAnimationFrame(introAnimation)
}

function introMouseMove(e) {
    const mouse = {
        x: e.clientX,
        y: e.clientY
    }

    translateIntroVelocity = map(mouse.x, 0, windowSize.width, 0.18, -0.18)

    skewIntro = map(mouse.x, 0, windowSize.width, -15, 15)

    rotateIntro = map(mouse.y, 0, windowSize.height, -15, 15)
}

introAnimation()