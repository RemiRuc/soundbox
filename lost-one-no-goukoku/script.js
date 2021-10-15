var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can'
document.body.appendChild( renderer.domElement );

let can = document.getElementById('can')
let pause = false

let arrayCyl = []
let pos = 1
let interval
let size = 0

let boxSize = 30
var geometry = new THREE.BoxGeometry( boxSize, boxSize, boxSize );
var material = new THREE.MeshLambertMaterial( { color: 'rgb(138, 189, 252)', side: THREE.BackSide, reflectivity: 1 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = boxSize/2
scene.add( cube );

var light = new THREE.AmbientLight( 0x777777 ); // soft white light
//scene.add( light );

var pointLight = new THREE.PointLight( 0xffffff, 3, 100 );
pointLight.position.y = 1
pointLight.position.z = -14
pointLight.position.x = -10
//scene.add( pointLight );

var pointLight2 = new THREE.PointLight( 0xffffff, 2, 20 );
pointLight2.position.y = 1
pointLight2.position.z = 0
pointLight2.position.x = 0
//scene.add( pointLight2 );

var pointLight3 = new THREE.PointLight( 0xffffff, 3, 100 );
pointLight3.position.y = 1
pointLight3.position.z = -14
pointLight3.position.x = 10
//scene.add( pointLight3 );

var pointLight4 = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight4.position.y = 7
pointLight4.position.z = -10
pointLight4.position.x = 0
//scene.add( pointLight4 );

var pointLight5 = new THREE.PointLight( 0xffffff, 1, 5 );
pointLight5.position.y = 1
pointLight5.position.z = -1
pointLight5.position.x = 0
//scene.add( pointLight4 );

camera.position.y = 1
camera.rotation.x = 0

class Cylinder{
    constructor(pos){
        this.pos = pos
        var geometry = new THREE.CylinderGeometry( 0.6, 0.6, 4, 6 )
        var material = new THREE.MeshLambertMaterial( {color: 'rgb(58, 109, 172)', flatShading: true, reflectivity: 0} )
        this.el = new THREE.Mesh( geometry, material )
        this.el.position.z = -10
        this.el.position.x = pos
        this.el.position.y = -2
        scene.add( this.el )
    }

    update(){
        if (this.el.position.y <= size) {
            this.el.position.y += 0.2
        }
        this.el.position.z += 0.25
        if (this.pos == 1) {
            this.el.rotation.y +=0.025
        } else {
            this.el.rotation.y -=0.025
        }
        this.draw()
        if (this.el.position.z >= 1) {
            this.delete()
        }
    }

    draw(){

    }

    delete(){
        scene.remove( this.el )
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

    if (!pause) {
        arrayCyl.forEach(el =>{
            el.update()
        })
    }

    renderer.render( scene, camera );

    requestAnimationFrame(renderFrame);
    
}

function load(){
    can.classList.add('s1')
    setTimeout(()=>{
        can.classList.add('s2')
    }, 800)
    setTimeout(()=>{
        can.classList.add('s3')
    }, 1600)
    setTimeout(()=>{
        pause = true
        can.classList.add('s4')
        document.getElementById('t4').classList.add('hide')
        clearInterval(interval)
    }, 14269)
    setTimeout(()=>{
        pause = false
        arrayCyl.push(new Cylinder(pos))
        pos = -pos
        interval = setInterval(()=>{
            arrayCyl.push(new Cylinder(pos))
            pos = -pos
        },(740.7/2))
    }, 14889)
    setTimeout(()=>{
        scene.add( light );
        scene.add(pointLight4)
        scene.add(pointLight5)
        arrayCyl.push(new Cylinder(pos))
        pos = -pos
        interval = setInterval(()=>{
            arrayCyl.push(new Cylinder(pos))
            pos = -pos
        },(740.7))

        document.getElementById('t1').classList.add('reveal')
        setTimeout(()=>{
            document.getElementById('t2').classList.add('reveal')
            document.getElementById('t1').classList.add('hide')
            setTimeout(()=>{
                document.getElementById('t3').classList.add('reveal')
                document.getElementById('t2').classList.add('hide')
                setTimeout(()=>{
                    document.getElementById('t4').classList.add('reveal')
                    document.getElementById('t3').classList.add('hide')
                }, (740.7*4))
            }, (740.7*4))
        }, (740.7*4))

    },3000)

    scene.add(pointLight)
    setTimeout(()=>{
        scene.remove(pointLight)
        scene.add(pointLight3)
        setTimeout(()=>{
            scene.remove(pointLight3)
            scene.add(pointLight)
            scene.add(pointLight3)
            setTimeout(()=>{
                scene.remove(pointLight)
                scene.remove(pointLight3)
            }, 800)
        }, 800)
    }, 800)


    setTimeout(()=>{
        size = -1
    },26832)
    setTimeout(()=>{
        size = 0
    },38620)
    setTimeout(()=>{
        size = -1
    },50000)
    setTimeout(()=>{
        size = 0
    },74137)
}

window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
};