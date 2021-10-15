// 3 to 20
let can = document.getElementById('can')
var ctx = can.getContext("2d")
can.width = window.innerWidth
can.height = window.innerHeight

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'can2'
document.body.appendChild( renderer.domElement );

var geometry = new THREE.PlaneGeometry( 2000, 2000, 10, 10 );
var material = new THREE.MeshBasicMaterial( {color: 0x4DBBD0, side: THREE.DoubleSide, wireframe: true} );
var plane = new THREE.Mesh( geometry, material );
plane.position.y = -100
plane.rotation.x = -(Math.PI/2)
scene.add( plane )
console.log(plane.geometry.vertices[100])

function renderFrame() {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#1F081C'
    ctx.rect(0,0,window.innerWidth,window.innerHeight)
    ctx.fill()
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    //console.log(frequencyData)

    
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 5
    let step = window.innerWidth/16
    ctx.moveTo(-step, window.innerHeight/2);
    let stepR = (246-7)/17
    let stepG = (163-2)/17
    let stepB = (186-100)/17
    for (let i = 0; i < 17; i++) {
        let pos = map(frequencyData[i+3],0,255,window.innerHeight/4,(window.innerHeight/4)*2)
        ctx.strokeStyle = `rgb(${stepR*i},${stepG*i},${stepB*i})`//7,163,186
        ctx.lineTo(step*(i), pos);
    }
    
    ctx.stroke();
    ctx.restore()

    for (let i = 0; i < plane.geometry.vertices.length; i++) {
        plane.geometry.vertices[i].z = Math.cos((Date.now()+(i*1000000))*0.0005)*30
        
    }

    plane.rotation.z += 0.001

    plane.geometry.verticesNeedUpdate = true
    renderer.render( scene, camera );
    requestAnimationFrame(renderFrame);
    
}

function load(){

}

window.addEventListener("resize",()=>{
    can.width = window.innerWidth
    can.height = window.innerHeight
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
})