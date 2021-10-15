var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true, antialiasing: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = "can"
document.body.appendChild( renderer.domElement );
let can = document.getElementById("can")

let r = 0
let g = 5
let b = 0


let geoArray = []

class Geo{
    constructor(geo){
        var geometry
        this.color = 'rgb('+r+','+g+','+b+')'
        this.velocityX = ranFloat(-0.02, 0.02)
        this.velocityY = ranFloat(-0.02, 0.02)
        switch (geo) {
            case 0:
                geometry = new THREE.BoxGeometry( 1, 1, 1 )
                break;
            case 1:
                geometry = new THREE.SphereGeometry( 1, 8, 8 )
                break;
            case 2:
                geometry = new THREE.ConeGeometry( 1, 2, 8 )
                break;
            case 3:
                geometry = new THREE.CylinderGeometry( 1, 1, 2, 8 )
                break;
        
            default:
                break;
        }
        var material = new THREE.MeshBasicMaterial( { color: this.color, wireframe: true, wireframeLinewidth: 2 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.position.z = -10
        scene.add( this.cube );
    }

    update(){
        this.cube.position.z += 0.025
        this.cube.rotation.x += this.velocityX;
        this.cube.rotation.y += this.velocityY;

        if (this.cube.position.z >= 1) {
            this.delete()
        }
    }

    delete(){
        scene.remove( this.cube );
    }
}

let obj1, obj2, obj3, obj4
let objGeo = [0, 1, 2, 3]

function changeGeo() {
    if (obj1 != null) {
        scene.remove( obj1 )
        scene.remove( obj2 )
        scene.remove( obj3 )
        scene.remove( obj4 )
    }

    for (let i = 0; i < objGeo.length; i++) {
        objGeo[i] = closure(objGeo[i] + 1, 0, 3)
        
    }

    let arrayGeo = []

    for (let i = 0; i < 4; i++) {
        let geometry
        switch (objGeo[i]) {
            case 0:
                geometry = new THREE.BoxGeometry( 1, 1, 1 )
                break;
            case 1:
                geometry = new THREE.SphereGeometry( 1, 8, 8 )
                break;
            case 2:
                geometry = new THREE.ConeGeometry( 1, 2, 8 )
                break;
            case 3:
                geometry = new THREE.CylinderGeometry( 1, 1, 2, 8 )
                break;
        
            default:
                break;
        }
        let mat = new THREE.MeshBasicMaterial( {color: 'rgb('+ran(0, 255)+','+ran(0, 255)+','+ran(0, 255)+')', wireframe: true, wireframeLinewidth: 2} )
        arrayGeo.push([geometry, mat])
    }

    obj1 = new THREE.Mesh( arrayGeo[0][0], arrayGeo[0][1] )
    obj2 = new THREE.Mesh( arrayGeo[1][0], arrayGeo[1][1] )
    obj3 = new THREE.Mesh( arrayGeo[2][0], arrayGeo[2][1] )
    obj4 = new THREE.Mesh( arrayGeo[3][0], arrayGeo[3][1] )

    obj1.position.z = -9
    obj1.position.x = -4
    obj1.position.y = 3

    obj2.position.z = -8
    obj2.position.x = -4
    obj2.position.y = -2

    obj3.position.z = -10
    obj3.position.x = 6
    obj3.position.y = 2.5

    obj4.position.z = -7
    obj4.position.x = 3.5
    obj4.position.y = -3.5

    scene.add( obj1 )
    scene.add( obj2 )
    scene.add( obj3 )
    scene.add( obj4 )
}


camera.position.z = 0;

function renderFrame() {
    analyser.getByteFrequencyData(frequencyData);
    let moy = 0
    frequencyData.forEach(el => {
        moy += el
    })
    moy = moy / frequencyData.length
    let color = map(moy, 0, 255, 0, 150)
    //console.log(frequencyData)
    document.body.style.backgroundImage = "radial-gradient(ellipse farthest-corner at center, rgb("+color+",0,0) 0%, rgb(0,0,0) 100%)"
    //can.style.opacity = map(moy, 0, 255, 0, 1)

    geoArray.forEach(el => {
        el.update()
    })
    if (obj1 != null) {
        obj1.rotation.x += 0.01
        obj1.rotation.y += 0.01
        obj2.rotation.x -= 0.01
        obj2.rotation.y += 0.01
        obj3.rotation.x += 0.01
        obj3.rotation.y -= 0.01
        obj4.rotation.x -= 0.01
        obj4.rotation.y -= 0.01

        obj1.scale.x = map(frequencyData[0],0,255, 0.5,1.5)
        obj1.scale.y = map(frequencyData[0],0,255, 0.5,1.5)
        obj1.scale.z = map(frequencyData[0],0,255, 0.5,1.5)

        obj2.scale.x = map(frequencyData[12],0,255, 0.5,1.5)
        obj2.scale.y = map(frequencyData[12],0,255, 0.5,1.5)
        obj2.scale.z = map(frequencyData[12],0,255, 0.5,1.5)

        obj3.scale.x = map(frequencyData[24],0,255, 0.5,1.5)
        obj3.scale.y = map(frequencyData[24],0,255, 0.5,1.5)
        obj3.scale.z = map(frequencyData[24],0,255, 0.5,1.5)

        obj4.scale.x = map(frequencyData[18],0,255, 0.5,1.5)
        obj4.scale.y = map(frequencyData[18],0,255, 0.5,1.5)
        obj4.scale.z = map(frequencyData[18],0,255, 0.5,1.5)
    }

    

    r = Math.round(Math.abs(Math.cos(Date.now() * 0.01) * 255))
    g = Math.round(Math.abs(Math.cos(Date.now() * 0.001) * 255))
    b = Math.round(Math.abs(Math.cos(Date.now() * 0.005) * 255))

    renderer.render( scene, camera );
    requestAnimationFrame(renderFrame);
    
}

function newGeo(geo) {
    geoArray.push(new Geo(geo))
}

function load(){
            newGeo(ran(0, 3))
            changeGeo()
            setInterval(()=>{
                newGeo(ran(0, 3))
                changeGeo()
            }, 3850)

}

window.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
};
