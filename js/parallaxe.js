let windowSize = {
    width: 0,
    height: 0
}

let dateTitleCenter = {
    x: 0,
    y: 0
}
let dateCenter = {
    x: 0,
    y: 0
}

let technoTitleCenter = {
    x: 0,
    y: 0
}
let technoCenter = {
    x: 0,
    y: 0
}



// Listeners
document.body.addEventListener('mousemove', e => {
    const parallaxeX = map(e.clientX, 0, windowSize.width, -3, 3)
    const parallaxeY = map(e.clientY, 0, windowSize.height, -3, 3)

    dateTitleElt.style.transform = setTranslate(e, dateTitleCenter)
    technoTitleElt.style.transform = setTranslate(e, technoTitleCenter)

    dateElt.style.transform = setTranslate(e, dateCenter, true)
    technoElt.style.transform = setTranslate(e, technoCenter, true)
})

window.addEventListener('resize', getWindowSize)



// Functions

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getWindowSize() {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight

    dateTitleCenter = getEltCenter(dateTitleElt)
    dateCenter = getEltCenter(dateElt)
    technoTitleCenter = getEltCenter(technoTitleElt)
    technoCenter = getEltCenter(technoElt)
}

function getEltCenter(elt) {
    eltBouncing = elt.getBoundingClientRect()
    return {
        x: eltBouncing.x + (eltBouncing.width/2),
        y: eltBouncing.y + (eltBouncing.height/2),
    }
}

function setTranslate(event, center, inversed = false) {
    const x = map(event.clientX, center.x - windowSize.width, center.x + windowSize.width, -10, 10)
    const y = map(event.clientY, center.y - windowSize.height, center.y + windowSize.height, -10, 10)

    if (inversed) {
        return `translate(
            ${-x}px, 
            ${-y}px)`
    }

    return `translate(
        ${x}px, 
        ${y}px)`
}

getWindowSize()