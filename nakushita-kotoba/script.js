var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can'
document.body.appendChild( renderer.domElement );

class Light{
    constructor(i, j){
        this.color = 255
        this.r = 0
        this.g = 0
        this.b = 0
        var geometry = new THREE.SphereGeometry( 0.1, 6, 6 )
        var material = new THREE.MeshBasicMaterial( {color: 'rgb('+this.color+','+this.color+','+this.color+')'} )
        this.sphere = new THREE.Mesh( geometry, material )
        this.sphere.position.z = i*2
        this.sphere.position.x = j*2

        this.light = new THREE.PointLight( 0xffffff, 0.5, 10 );
        this.light.position.z = i*2
        this.light.position.x = j*2
        block.add( this.light );

        block.add( this.sphere );
    }

    update(val){
        this.color = Math.round(map(val,0,255,0,255))
        this.r = Math.abs(Math.round(Math.sin((Date.now()-(this.sphere.position.x*1000))*0.001)*255))
        this.g = Math.abs(Math.round(Math.sin((Date.now()-(this.sphere.position.y*1000))*0.001)*255))
        this.b = Math.abs(Math.round(Math.sin((Date.now()-(this.sphere.position.z*1000))*0.001)*255))
        this.light.intensity = map(val, 0, 255, 0, 1)
        this.light.color = new THREE.Color("rgb("+this.r+","+this.g+","+this.b+")")
        this.sphere.material.color = new THREE.Color("rgb("+this.color+","+this.color+","+this.color+")")
        this.sphere.position.y = (Math.sin((Date.now()-(this.sphere.position.x*1000))*0.001) * Math.sin((Date.now()-(this.sphere.position.z*1000))*0.001))*0.5
        this.light.position.y = (Math.sin((Date.now()-(this.sphere.position.x*1000))*0.001) * Math.sin((Date.now()-(this.sphere.position.z*1000))*0.001))*0.5
    }
}
let arrayLight = []
let block = new THREE.Object3D
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        arrayLight.push(new Light(i, j))
    }
}
scene.add(block)
block.position.x = -(5*((0.1/2)+3))/4
block.position.y = 1
block.position.z = -(5*((0.1/2)+3))/4

var geometry = new THREE.PlaneGeometry( 20, 20, 1 );
var material = new THREE.MeshPhongMaterial( {color: 0x000022, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -Math.PI/2
scene.add( plane );

camera.position.z = 0
camera.position.y = 15

camera.lookAt(new THREE.Vector3(-0,-0,0))


let can = document.getElementById('can')

function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)
    for (let i = 0; i < 10; i++) {
        arrayLight[i].update(frequencyData[i+5]) 
    }
    for (let i = 10; i < 25; i++) {
        arrayLight[i].update(frequencyData[(i+5)-10]) 
    }

    camera.rotation.y += 0.0005
    renderer.render( scene, camera );
    requestAnimationFrame(renderFrame);
    
}

function load(){
    setInterval(()=>{
        camera.position.z = ranFloat(-3, 3)
        camera.position.y = ranFloat(5, 10)
        camera.position.x = ranFloat(-3, 3)
        
        camera.lookAt(new THREE.Vector3(-0,-0,0))
    }, 3000)

    setTimeout(()=>{
        can.classList.add('blur')
        document.getElementById('text').classList.add('reveal')
    }, 38000)

    setTimeout(()=>{
        can.classList.remove('blur')
        document.getElementById('text').classList.remove('reveal')
    }, 47000)
}

window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
};