//animation
////base
let now = Date.now()
let lastNow = now
let deltaTime = 0
let duration = 0
let currentTime = 0
let musicPlayed = false

////Animations
let changeCamera = 0
let changeCameraTab = [false, false]
let changeCameraBool = false
let actualCamera = 0

let wallRotationSpeed = 0.005

//////Spotlight Z
let spotlightZtime = 0
let spotlightZDuration = 20000
let spotlightZ = true

////Rotation Arrow
let rotationArrow = true
let rotationArrowDuration = 20000
let rotationArrowTime = 0
let rotationArrowDirection = 1

////Rotation Z Arrow
let rotationZArrow = true
let rotationZArrowDuration = 20000
let rotationZArrowTime = 0
let rotationZArrowDirection = 1

////Rotation Z Circle
let rotationZCircle = true
let rotationZCircleDuration = 20000
let rotationZCircleTime = 0
let rotationZCircleDirection = 1

////Radius
let changeRadius = false

//song
let bpmCouplet = 52



//Set SpotLight
let numberColumn = 80
let numberRow = 22
let circleRayon = 10

//Camera
function cameraRotate(cam){
    myCamera.rotation.x = cam.x
    myCamera.rotation.y = cam.y
    myCamera.rotation.z = cam.z
    camera.rotation.x = myCamera.rotation.x
    camera.rotation.y = myCamera.rotation.y
    camera.rotation.z = myCamera.rotation.z
}

let myCamera =  {
    rotation :  {
        x : 0,
        y : 0,
        z : 0
    }
}

let cameras = {
    default:{
        x:0,
        y:0,
        z:0
    },
    main:{
        x:0,
        y:1.3,
        z:0
    },
    1:{
        x:1,
        y:1,
        z:0
    },
    2:{
        x:1.5,
        y:1,
        z:0.3
    },
    3:{
        x:0.8,
        y:1.7,
        z:1.8
    },
    4:{
        x:1.6,
        y:1.7,
        z:0.8
    },
    5:{
        x:1.7,
        y:1.3,
        z:0.1
    },
    6:{
        x:1,
        y:1.6,
        z:1.6
    },
    7:{
        x:1.8,
        y:0.3,
        z:0.4
    },
    8:{
        x:0.7,
        y:1,
        z:0
    },
}