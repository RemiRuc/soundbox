//Descriptions Elements
const descriptionElt = document.querySelector(".description")
const dateTitleElt = document.querySelector(".date .description-title")
const technoTitleElt = document.querySelector(".techno .description-title")
const dateElt = document.querySelector(".date .description-info")
const technoElt = document.querySelector(".techno .description-info")
const collabElt = document.querySelector(".collab")

//Naviguation Elements
const sectionElt = document.querySelector('.section')
const linksElts = document.querySelectorAll('.link')
const titlesElts = document.querySelectorAll('.title')
const subTitlesElts = document.querySelectorAll('.subtitle')

// Player Elements
const circleElt = document.querySelector('.circle')
const linkElt = document.querySelector('.circle .play')
const playElt = document.querySelector('#play')
const interactiveElt = document.querySelector('.interactive')

//Naviguation variables
let actualLink = 8
let isNaviguate = false

let isTouching = false
let touchStartY = 0
let touchOrWheelDelta = 0


//Listeners
window.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        actualLink++
    }

    if (event.code === 'ArrowDown') {
        actualLink--
    }

    if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        
        naviguate()

    }

    if (event.code === 'Enter') {
        if (document.activeElement.tagName === 'a' && document.activeElement.href.baseVal !== undefined) {
            window.open(document.activeElement.href.baseVal,'_blank');
        }
        console.log(document.activeElement.href.baseVal);
    }

});


document.body.addEventListener('touchstart', (e) => {
    isTouching = true
    touchStartY = e.touches[0].clientY
    console.log(touchStartY)
})

document.body.addEventListener('touchmove', (e) => {
    touchOrWheelDelta = e.touches[0].clientY - touchStartY
})

document.body.addEventListener('touchend', () => {
    isTouching = false
    console.log(touchOrWheelDelta)
    touchOrWheelDelta = 0
    touchStartY = 0
})

window.addEventListener('wheel', (e) => {
    touchOrWheelDelta = e.deltaY * 0.008
})

window.addEventListener('wheel', wheelAndTouchMoveManager)
document.body.addEventListener('touchmove', wheelAndTouchMoveManager)

linksElts.forEach(link => {
    link.addEventListener('focus', ()=>{
        const focused = parseInt(link.dataset.pos)
        actualLink = focused
        naviguate()
        sectionElt.scrollTo(0,0)
    })

    link.addEventListener('click', (e)=>{
        const focused = parseInt(link.dataset.pos)
        console.log(actualLink, focused)
        e.preventDefault()
        if (actualLink !== focused) {


            return false
        }
    })
})

linkElt.addEventListener('mouseenter', () => {
    playElt.classList.add('hovered')
})

linkElt.addEventListener('mouseleave', () => {
    playElt.classList.remove('hovered')
})



// Functions

function wheelAndTouchMoveManager() {
    if (!isNaviguate) {
        let toTitleActual = parseFloat(titlesElts[actualLink].children[0].attributes.startOffset.value) - touchOrWheelDelta
        let startOffsetActual = parseFloat(titlesElts[actualLink].children[0].dataset.active)
        let diffActualTo = startOffsetActual - toTitleActual
    
        if (diffActualTo >= 2) {
            actualLink++
            naviguate()
        } else if (diffActualTo <= -2) {
            actualLink--
            naviguate()
        } else {
            for (let i = 0; i < titlesElts.length; i++) {
    
                let toTitle = parseFloat(titlesElts[i].children[0].attributes.startOffset.value) - touchOrWheelDelta
                let toSubtitle = parseFloat(subTitlesElts[i].children[0].attributes.startOffset.value) - touchOrWheelDelta
    
                titlesElts[i].children[0].setAttribute('startOffset', toTitle)
                subTitlesElts[i].children[0].setAttribute('startOffset', toSubtitle)
            }
        }
    }
}

function naviguate() {
    isNaviguate = true
    if (actualLink > titlesElts.length - 1) actualLink = 0
    if (actualLink < 0) actualLink = titlesElts.length - 1

    videoNaviguateManager()

    linksElts.forEach(link => {
        link.classList.remove('active')
    })
    linksElts[actualLink].classList.add('active')

    let deltaTitle = parseFloat(titlesElts[actualLink].children[0].dataset.active) - parseFloat(titlesElts[actualLink].children[0].attributes.startOffset.value)
    let deltaSubtitle = parseFloat(subTitlesElts[actualLink].children[0].dataset.active) - parseFloat(subTitlesElts[actualLink].children[0].attributes.startOffset.value)

    for (let i = 0; i < titlesElts.length; i++) {

        let toTitle = parseFloat(titlesElts[i].children[0].attributes.startOffset.value) + deltaTitle
        let toSubtitle = parseFloat(subTitlesElts[i].children[0].attributes.startOffset.value) + deltaSubtitle

        // if (toTitle > 100) toTitle -= 100
        // if (toSubtitle > 100) toSubtitle -= 100
        // if (toTitle < 0) toTitle += 100
        // if (toSubtitle < 0) toSubtitle += 100

        titlesElts[i].children[0].setAttribute('data-to', toTitle)
        subTitlesElts[i].children[0].setAttribute('data-to', toSubtitle)
    }
}

function animNaviguation() {
    if (parseInt(titlesElts[actualLink].children[0].dataset.active) - parseInt(titlesElts[actualLink].children[0].attributes.startOffset.value) === 0 && isNaviguate) {
        video.pause();
        source.setAttribute('src', '/preview/'+SLUGS[actualLink].title+'.mp4'); 
        video.load();
        if (introPassed) {
            video.play();
        }

        dateElt.innerHTML = SLUGS[actualLink].why
        technoElt.innerHTML = SLUGS[actualLink].techno
        linkElt.setAttribute('href','/'+SLUGS[actualLink].title)

        isNaviguate = false
        canvas.classList.remove('transition')
        video.classList.remove('transition')
        circleElt.classList.remove('transition')
        descriptionElt.classList.remove('transition')
        playElt.classList.remove('transition')
        interactiveElt.classList.remove('transition')
        if (actualLink === 8) {
            collabElt.style.display = 'block'
        } else {
            collabElt.style.display = 'none'
        }

        if (actualLink === 0 || actualLink === 1) {
            interactiveElt.classList.remove('hide')
        } else {
            interactiveElt.classList.add('hide')
        }
    }

    for (let i = 0; i < titlesElts.length; i++) {
        let startOffsetTitle = parseFloat(titlesElts[i].children[0].attributes.startOffset.value)
        let toTitle = parseFloat(titlesElts[i].children[0].dataset.to)
        startOffsetTitle += (toTitle - startOffsetTitle) * 0.08
        
        let startOffsetSubtitle = parseFloat(subTitlesElts[i].children[0].attributes.startOffset.value)
        let toSubtitle = parseFloat(subTitlesElts[i].children[0].dataset.to)
        startOffsetSubtitle += (toSubtitle - startOffsetSubtitle) * 0.06

        titlesElts[i].children[0].setAttribute('startOffset', startOffsetTitle + '%')
        subTitlesElts[i].children[0].setAttribute('startOffset', startOffsetSubtitle + '%')
    }
}