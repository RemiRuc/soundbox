var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
scene.background = new THREE.Color( 0x070614 );

var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.domElement.id="main"
document.body.appendChild( renderer.domElement )

//light
var light = new THREE.AmbientLight( 0xffffff ) // soft white light
scene.add( light )


camera.position.z = -(numberColumn/2)
/*
myCamera.rotation.y = 1.3
camera.rotation.y = myCamera.rotation.y*/
actualCamera = rand(1,8)
cameraRotate(cameras[actualCamera])


var wall = new THREE.Object3D()
var spotArr = []
let gradient = 0
for (let column = 0; column < numberColumn; column++) {
    for (let row = 0; row < numberRow; row++) {
        let x = Math.cos(-row * Math.PI/(numberRow/2)) * (circleRayon);
        let y = Math.sin(-row * Math.PI/(numberRow/2)) * (circleRayon);
        let thetaStart
        if (row%2==0) {
            thetaStart = 0
        } else {
            thetaStart = 3
        }
        if (column ==0) {
            console.log(thetaStart)
        }
        let arrowColor = {
            r: Math.floor(map(gradient,0, numberRow*5,246,232)),
            g: Math.floor(map(gradient,0, numberRow*5,0,0)),
            b: Math.floor(map(gradient,0, numberRow*5,3,247)),
        }
        let ringColor = {
            r: Math.floor(map(gradient,0, numberRow*5,192,13)),
            g: Math.floor(map(gradient,0, numberRow*5,192,126)),
            b: Math.floor(map(gradient,0, numberRow*5,19,106)),
        }
        if (gradient>=numberRow*5) {
            gradient = 0
        } else {
            gradient++
        }
        let aleatoire = rand(10,800)
        let geometry = new SpotLight(x,y,-column*3, thetaStart, circleRayon ,aleatoire, column, row, arrowColor, ringColor)
        spotArr.push(geometry)
        wall.add(geometry.render)
    }
}

var geometry = new THREE.SphereGeometry( 1000, 32, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0x070614, side: THREE.BackSide, flatShading: true} );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.z = -(numberColumn/2)
scene.add( sphere );

var light = new THREE.PointLight( 0xffffff, 0.01, 0 )
light.position.z = -(numberColumn/2)
scene.add( light );

scene.add(wall)

//Post processing
var renderScene = new THREE.RenderPass( scene, camera );
var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.renderToScreen = true;
bloomPass.threshold = 0;
bloomPass.strength = 0.8;
bloomPass.radius = 1;

composer = new THREE.EffectComposer( renderer );
composer.setSize( window.innerWidth, window.innerHeight );
composer.addPass( renderScene );
composer.addPass( bloomPass );


function animate() {
    //Animation bases
    now = Date.now()
    deltaTime = now - lastNow
    lastNow = now
    if (musicPlayed) {
        currentTime += deltaTime
    }

    

    //animations
    if (changeCameraBool == true) {
        changeCamera += deltaTime
        if ( changeCamera >= 4624) {
            let randCamera = rand(1,8)
            if (randCamera == actualCamera) {
                if (randCamera == 1) {
                    randCamera++
                } else{
                    randCamera--
                } 
            }
            actualCamera = randCamera
            cameraRotate(cameras[actualCamera])
            changeCamera = 0
        }
    }

    ////Z Spotlight
    if (spotlightZ) {
        spotlightZtime += deltaTime
        if (spotlightZtime >= spotlightZDuration) {
            spotlightZtime = 0
        }
        for (let i = 0; i < spotArr.length; i++) {
            if (i%2==0) {
                spotArr[i].moveZ(0.05);
            } else {
                spotArr[i].moveZ(-0.05);
            }
        }
    }

    ////Rotation Arrow
    if (rotationArrow) {
        rotationArrowTime += deltaTime
        if (rotationArrowTime >= rotationArrowDuration) {
            rotationArrowTime = 0
            rotationArrowDirection = -rotationArrowDirection
        }
        for (let i = 0; i < spotArr.length; i++) {
            if (rotationArrowDirection === 1) {
                if (spotArr[i].thetaStart == 0) {
                    spotArr[i].render.children[1].rotation.z = easeInOutQuad(rotationArrowTime, 0, Math.PI, rotationArrowDuration)
                } else {
                    spotArr[i].render.children[1].rotation.z = easeInOutQuad(rotationArrowTime, Math.PI, -Math.PI, rotationArrowDuration)
                }
            } else {
                if (spotArr[i].thetaStart == 0) {
                    spotArr[i].render.children[1].rotation.z = easeInOutQuad(rotationArrowTime, Math.PI, -Math.PI, rotationArrowDuration)
                } else {
                    spotArr[i].render.children[1].rotation.z = easeInOutQuad(rotationArrowTime, 0, Math.PI, rotationArrowDuration)
                }
            }
        }
    }

    ////Rotation Z Arrow
    if (rotationZArrow) {
        for (let i = 0; i < spotArr.length; i++) {
            if (spotArr[i].thetaStart == 0) {
                spotArr[i].render.children[1].rotation.y += (0.025)/2;
            } else {
                spotArr[i].render.children[1].rotation.y -= (0.025)/2;
            }
        }
    }

    ////Rotation Z Circle
    if (rotationZCircle) {
        for (let i = 0; i < spotArr.length; i++) {
            if (spotArr[i].thetaStart == 0) {
                spotArr[i].render.children[0].rotation.y += (0.05)/2;
            } else {
                spotArr[i].render.children[0].rotation.y -= (0.05)/2;
            }
        }
    }

    ////Cameras
    if(currentTime >= 877){
        changeCameraBool = true
    }
    spotlightZ = true
    if (currentTime >= 42574 && currentTime <= 49795) {
        changeCameraBool = false
        if (changeCameraTab[0] == false) {
            TweenMax.to(camera.rotation, 4.371, {x:0, y:0, z:0, ease: Expo.easeIn})
            TweenMax.to(myCamera.rotation, 4.371, {x:0, y:0, z:0, ease: Expo.easeIn})
            changeCameraTab[0] = true
        }
    }

    if (currentTime >= 47000 && currentTime <= 74743) {
        changeRadius = true
        spotlightZ = false
        changeCameraBool = false
        for (let i = 0; i < spotArr.length; i++) {
            if (currentTime <= 72461) {
                spotArr[i].moveZ(1)
            } else {
                changeCamera = 4624
                spotArr[i].moveZ(0.5)
            }
        }
    }

    if (currentTime >= 107271 && currentTime <= 111693) {
        changeRadius = false
        changeCameraBool = false
        if (changeCameraTab[1] == false) {
            TweenMax.to(camera.rotation, 4.371, {x:0, y:0, z:0, ease: Expo.easeIn})
            TweenMax.to(myCamera.rotation, 4.371, {x:0, y:0, z:0, ease: Expo.easeIn})
            changeCameraTab[1] = true
        }
    }

    if (currentTime >= 111693 && currentTime <= 148649) {
        spotlightZ = false
        changeCameraBool = false
        for (let i = 0; i < spotArr.length; i++) {
            spotArr[i].moveZ(1);
        }
    }
    if (currentTime >= 148649 && currentTime <= 169218) {
        changeCameraBool = false
    }

    if (currentTime >= 169218) {
        changeCameraBool = false
        rotationZArrow = false
        spotlightZ = false
        rotationZCircle = false
        changeRadius = true 
        for (let i = 0; i < spotArr.length; i++) {
            spotArr[i].lookAt()
            spotArr[i].moveZ(1)
        }
    }

    if (currentTime >= 210000) {
        document.querySelector("#mainScreen").style.display = "flex"     
    }


    analyser.getByteFrequencyData(frequencyData)

    spotArr.forEach(el=>{
        let newOpacity = map(frequencyData[el.frequencyLink], 0, 255, 0,1)
        let newRayon = map(frequencyData[el.frequencyLink], 0, 255, 12,8)
        el.update(newOpacity, newRayon)
    })

    wall.rotation.z += wallRotationSpeed

    //Lyrics
    TweenMax.to("#lyrics>div", 1, {opacity:0})
    if (currentTime >= 10000 && currentTime <= 14800) {
        TweenMax.to("#lyrics>div:nth-child(1)", 1, {opacity:1})
    }
    if (currentTime >= 19000 && currentTime <= 24053) {
        TweenMax.to("#lyrics>div:nth-child(2)", 1, {opacity:1})
    }
    if (currentTime >= 29000 && currentTime <= 33369) {
        TweenMax.to("#lyrics>div:nth-child(3)", 1, {opacity:1})
    }
    if (currentTime >= 33369 && currentTime <= 38000) {
        TweenMax.to("#lyrics>div:nth-child(4)", 1, {opacity:1})
    }
    if (currentTime >= 38000 && currentTime <= 42554) {
        TweenMax.to("#lyrics>div:nth-child(5)", 1, {opacity:1})
    }
    if (currentTime >= 42554 && currentTime <= 46700) {
        TweenMax.to("#lyrics>div:nth-child(6)", 1, {opacity:1})
    }

    if (currentTime >= 46800 && currentTime <= 51752) {
        TweenMax.to("#lyrics>div:nth-child(7)", 1, {opacity:1})
    }
    if (currentTime >= 51752 && currentTime <= 55252) {
        TweenMax.to("#lyrics>div:nth-child(8)", 1, {opacity:1})
    }
    if (currentTime >= 55850 && currentTime <= 61000) {
        TweenMax.to("#lyrics>div:nth-child(9)", 1, {opacity:1})
    }
    if (currentTime >= 61000 && currentTime <= 65550) {
        TweenMax.to("#lyrics>div:nth-child(10)", 1, {opacity:1})
    }
    if (currentTime >= 70200 && currentTime <= 74828) {
        TweenMax.to("#lyrics>div:nth-child(11)", 1, {opacity:1})
    }

    if (currentTime >= 74828 && currentTime <= 79569) {
        TweenMax.to("#lyrics>div:nth-child(12)", 1, {opacity:1})
    }
    if (currentTime >= 84075 && currentTime <= 88687) {
        TweenMax.to("#lyrics>div:nth-child(13)", 1, {opacity:1})
    }
    if (currentTime >= 93638 && currentTime <= 98000) {
        TweenMax.to("#lyrics>div:nth-child(14)", 1, {opacity:1})
    }
    if (currentTime >= 98000 && currentTime <= 102510) {
        TweenMax.to("#lyrics>div:nth-child(15)", 1, {opacity:1})
    }
    if (currentTime >= 102510 && currentTime <= 107151) {
        TweenMax.to("#lyrics>div:nth-child(16)", 1, {opacity:1})
    }
    if (currentTime >= 107151 && currentTime <= 111508) {
        TweenMax.to("#lyrics>div:nth-child(17)", 1, {opacity:1})
    }

    if (currentTime >= 111508 && currentTime <= 116387) {
        TweenMax.to("#lyrics>div:nth-child(18)", 1, {opacity:1})
    }
    if (currentTime >= 117838 && currentTime <= 119589) {
        TweenMax.to("#lyrics>div:nth-child(19)", 1, {opacity:1})
    }
    if (currentTime >= 120000 && currentTime <= 125600) {
        TweenMax.to("#lyrics>div:nth-child(20)", 1, {opacity:1})
    }
    if (currentTime >= 125600 && currentTime <= 130198) {
        TweenMax.to("#lyrics>div:nth-child(21)", 1, {opacity:1})
    }
    if (currentTime >= 134773 && currentTime <= 139560) {
        TweenMax.to("#lyrics>div:nth-child(22)", 1, {opacity:1})
    }

    if (currentTime >= 149247 && currentTime <= 153375) {
        TweenMax.to("#lyrics>div:nth-child(23)", 1, {opacity:1})
    }
    if (currentTime >= 153375 && currentTime <= 157976) {
        TweenMax.to("#lyrics>div:nth-child(24)", 1, {opacity:1})
    }
    if (currentTime >= 157976 && currentTime <= 162648) {
        TweenMax.to("#lyrics>div:nth-child(25)", 1, {opacity:1})
    }
    if (currentTime >= 162648 && currentTime <= 166946) {
        TweenMax.to("#lyrics>div:nth-child(26)", 1, {opacity:1})
    }

    if (currentTime >= 169337 && currentTime <= 174082) {
        TweenMax.to("#lyrics>div:nth-child(27)", 1, {opacity:1})
    }
    if (currentTime >= 174082 && currentTime <= 177708) {
        TweenMax.to("#lyrics>div:nth-child(28)", 1, {opacity:1})
    }
    if (currentTime >= 178548 && currentTime <= 183247) {
        TweenMax.to("#lyrics>div:nth-child(29)", 1, {opacity:1})
    }
    if (currentTime >= 183247 && currentTime <= 188000) {
        TweenMax.to("#lyrics>div:nth-child(30)", 1, {opacity:1})
    }
    if (currentTime >= 192657 && currentTime <= 197217) {
        TweenMax.to("#lyrics>div:nth-child(31)", 1, {opacity:1})
    }

    if (currentTime >= 201746 && currentTime <= 206769) {
        TweenMax.to("#lyrics>div:nth-child(32)", 1, {opacity:1})
    }

	requestAnimationFrame( animate )
	composer.render( scene, camera )
}

loadSound('audio/audio.mp3')