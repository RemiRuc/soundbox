var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can'
document.body.appendChild( renderer.domElement );

let arrayBar = []
let up =false
let block = false
let updateCamera = false
let firstSetInterval

camera.position.x = 0
camera.position.y = 4
camera.position.z = 6

camera.lookAt(new THREE.Vector3(-0,-0,0))

var geometry = new THREE.PlaneGeometry( 7, 7, 32, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true,side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -Math.PI/2

var geometry2 = new THREE.PlaneGeometry( 40, 70, 32, 1 );
var material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true,side: THREE.DoubleSide} );
var plane2 = new THREE.Mesh( geometry2, material2 );
plane2.position.z = -10

class Bar{
    constructor(i){
        this.i = i
        var geometry = new THREE.BoxGeometry( 0.5, 1, 0.5 )
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: false} )
        this.cube = new THREE.Mesh( geometry, material )
        this.cube.position.x = ((this.i-2)*1) 
        this.cube.rotation.x = -Math.PI/2
        this.cube.position.z = 0.5
        plane.add( this.cube );
    }

    update(val){
        let scale = map(val, 0, 255, 0, 2)
        this.cube.scale.y = scale
        this.cube.position.z = 0.5 * scale
    }

    newColor(r, g, b){
        this.r = r
        this.g = g
        this.b = b
        this.cube.material.color = new THREE.Color(`rgb(${this.r},${this.g},${this.b})`)
    }
}

for (let i = 0; i < 5; i++) {
    arrayBar.push(new Bar(i))
    
}

scene.add( plane );
// scene.add( plane2 );


function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    if (up) {
        for (let i = 0; i < arrayBar.length; i++) {
            if (!block) {
                arrayBar[i].update(frequencyData[i*4])
            } else {
                arrayBar[i].update(0)
            }
            
        }
    }

    if (updateCamera) {
        camera.position.z = map(moy, 0,255,2,8)
        camera.lookAt(new THREE.Vector3(-0,-0,0))
    }

    plane.rotation.z += 0.01
    plane2.position.z = map(moy, 0, 255, -15, -8)

    renderer.render( scene, camera );
    requestAnimationFrame(renderFrame);
    
}

function load(){
    plane.rotation.z -= 0.3
    firstSetInterval = setInterval(()=>{
        plane.rotation.z -= 0.3
        arrayBar.forEach(el => {
            el.newColor(ran(100,200),ran(100,200),ran(100,200))
        })
        plane.material.color = new THREE.Color(`rgb(${ran(100,200)},${ran(100,200)},${ran(100,200)})`)
    }, 580)
    setTimeout(()=>{
        plane.material.wireframe = false
        arrayBar.forEach(el=>{
            el.cube.material.wireframe = true
        })
        setInterval(() => {
            if (plane.material.wireframe == true) {
                plane.material.wireframe = false
                arrayBar.forEach(el=>{
                    el.cube.material.wireframe = true
                })
            } else {
                plane.material.wireframe = true
                arrayBar.forEach(el=>{
                    el.cube.material.wireframe = false
                })
            }
        }, 2300);
    }, 23074)

    setTimeout(() => {
        block = true
    }, 20790);

    setTimeout(() => {
        block = false
        updateCamera = true
    }, 23074);

    setTimeout(()=>{
        up = true
        plane.rotation.z -= 0.3
        clearInterval(firstSetInterval)
        firstSetInterval = setInterval(()=>{
            arrayBar.forEach(el => {
                el.newColor(ran(100,200),ran(100,200),ran(100,200))
            })
            plane.material.color = new THREE.Color(`rgb(${ran(100,200)},${ran(100,200)},${ran(100,200)})`)
        }, 580*2)
    },4569)
}

window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
};