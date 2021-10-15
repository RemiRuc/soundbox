var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can'
document.body.appendChild( renderer.domElement );

let arraySquare = []
let objScene = new THREE.Object3D()
let deg = 0

var geometry = new THREE.PlaneGeometry( 2000, 2000, 1 );
var material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -(Math.PI/2)
objScene.add( plane )

class Square{
    constructor(i){
        this.i = i
        var geometry = new THREE.PlaneGeometry( 0.5, 0.5, 1 );
        var material = new THREE.MeshPhongMaterial( {color: 0x4DBBD0} );
        this.plane = new THREE.Mesh( geometry, material );
        this.plane.position.x = ran(-300, 300)
        this.plane.position.y = ran(0, 300)
        this.plane.position.z = ran(-300, 300)
        objScene.add( this.plane )
    }

    update(val){
        this.plane.position.y -= 0.5
        if (this.plane.position.y < -1) {
            this.plane.position.y = 300
        }
        this.plane.lookAt(new THREE.Vector3(0,0,0))
    }
}

for (let i = 0; i < 5000; i++) {
    arraySquare.push(new Square(ran(0,31)))
    
}

var light = new THREE.PointLight( 0xffffff, 1, 300 );
light.position.set( 0, 100, 0 );
scene.add( light );

camera.position.y = 5
camera.lookAt(new THREE.Vector3(0,10,10))

scene.add(objScene)

function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    arraySquare.forEach(el=>{
        el.update(frequencyData[el.i])
    })

    light.position.y = (Math.cos(Date.now()*0.001)*70)+90
    objScene.rotation.y += 0.0025
    deg++
    document.getElementById('can').style.filter = 'hue-rotate('+deg+'deg)'
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