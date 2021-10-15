class SpotLight{
    constructor(x, y, z, thetaStart, rayon, frequencyLink, column, row, arrowColor, ringColor){
        this.x=x
        this.y=y
        this.z=z
        this.column = column
        this.row = row
        this.arrowColor = arrowColor
        this.ringColor = ringColor
        this.thetaStart = thetaStart
        this.rayon = rayon
        this.frequencyLink = frequencyLink
        this.opacity = 1

        //init
        this.render = new THREE.Object3D()
        //Ring
        var geometry = new THREE.RingGeometry( 1, 1.3, 32, 1, 0 )
        var material = new THREE.MeshBasicMaterial( {color: "rgb("+this.ringColor.r+", "+this.ringColor.g+", "+this.ringColor.b+")", transparent: true, opacity: 1} )
        this.render.add(new THREE.Mesh( geometry, material ))
        //Arrow
        var geometry = new THREE.CircleGeometry( 1, 1, this.thetaStart );
        var material = new THREE.MeshBasicMaterial( {color: "rgb("+this.arrowColor.r+", "+this.arrowColor.g+", "+this.arrowColor.b+")", transparent: true, opacity: 1} )
        this.render.add(new THREE.Mesh( geometry, material ))
        this.render.position.set(this.x, this.y, this.z)
        this.render.lookAt(new THREE.Vector3( 0, 0, this.z ))
    }

    update(opacity, rayon){
        if (changeRadius) {
            this.rayon = rayon
        } else {
            this.rayon = circleRayon
        }
        this.opacity = opacity
        this.draw()
    }

    moveZ(add){
        this.z += add
        if (this.z>=0) {
            this.z = -numberColumn*3
        } else if (this.z <= -numberColumn*3){
            this.z = 0
        }
    }

    lookAt(){
        this.render.children.forEach(el=>{
            el.rotation.x = 0
            el.rotation.y = 0
            el.rotation.z = 0
        })
        this.render.lookAt(new THREE.Vector3( 0, 0, this.z ))
    }

    draw(){
        this.render.position.x = Math.cos(-this.row * Math.PI/(numberRow/2)) * (this.rayon)
        this.render.position.y = Math.sin(-this.row * Math.PI/(numberRow/2)) * (this.rayon)
        this.render.position.z = this.z
        this.render.children.forEach(el => {
            el.material.opacity = this.opacity
        });
    }
}