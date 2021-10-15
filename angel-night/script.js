var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can'
document.body.appendChild( renderer.domElement );

scene.fog = new THREE.Fog(0x000028, -100, 250);
scene.background = new THREE.Color(0x000028);

let arrayBar = []
let arrayRing = []
let block = false
let grayscale = 1
let size = 4

class Bar{
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z

        var geometry = new THREE.BoxGeometry( 0.1, 0.1, 5 )
        var material = new THREE.MeshPhongMaterial( {color: 'rgb('+ran(155,255)+','+ran(155,255)+','+ran(155,255)+')'} )
        this.cube = new THREE.Mesh( geometry, material )
        this.cube.position.set(this.x, this.y, this.z)
        barContainer.add( this.cube )
    }

    update(){
        this.cube.position.z += 2
        if (this.cube.position.z >= (0+2.5)) {
            let x = ran(-size,size)
            let y = ran(-size,size)
            if (x == 0) {
                x = -3
            }
            if (y == 0) {
                y = -3
            }
            this.cube.position.set(x, y, -200)
        }
    }
}

class Ring{
    constructor(){
        var geometry = new THREE.RingGeometry( size, size+1, 32 );
        var material = new THREE.MeshPhongMaterial( { color: 'rgb('+ran(100,200)+','+ran(100,200)+','+ran(100,200)+')', side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.z = -200
        scene.add( this.mesh );
    }

    update(){
        this.mesh.position.z += 1
        if (this.mesh.position.z > 0) {
            scene.remove(this.mesh)
        }
    }
}

let barContainer = new THREE.Object3D()

for (let i = 0; i < 200/3; i++) {
    let x = ran(-size,size)
    let y = ran(-size,size)
    if (x == 0) {
        x = -3
    }
    if (y == 0) {
        y = -3
    }
    arrayBar.push(new Bar(x,y, -(3*i)))
    
}

var geometry = new THREE.PlaneGeometry( 2000, 2000, 1 );
var material = new THREE.MeshPhongMaterial( {color: 0x4DBBD0, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.position.y = -5
plane.rotation.x = -(Math.PI/2)
scene.add( plane )

scene.add(barContainer)

var light = new THREE.PointLight( 0xffffff, 1, 5000 );
scene.add( light );

function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    if (frequencyData[10] >= 160) {
        if (!block) {
            arrayRing.push(new Ring())
            block = true
            setTimeout(()=>{block=false}, 600)
        }
    }

    arrayRing.forEach(el =>{
        el.update()
    })

    arrayBar.forEach(el => {
        el.update()
    })

    barContainer.rotation.z += 0.01

    grayscale -= 0.001
    document.getElementById('can').style.filter = 'brightness(2) hue-rotate(45deg) grayscale('+grayscale+')'

    renderer.render( scene, camera );
    requestAnimationFrame(renderFrame);
    
}

function load(){

}

window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
};