/****
 ** 
 ** This file contains the main effects of this project
 **
 ****/




/**
 * GLOBALS AND GENERAL SETTINGINGS
 **/
let scene       = new THREE.Scene()
let camera      = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer    = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
controls = new THREE.OrbitControls(camera, renderer.domElement)

camera.position.z = 3
camera.position.y = .5;




/**
 * STATS 
 **/
(function() { 
    var script=document.createElement('script')
    script.onload = function() {
        var stats = new Stats()
        document.body.appendChild(stats.dom)
        requestAnimationFrame(function loop() {
            stats.update()
            requestAnimationFrame(loop)
        })
    }
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'
    document.head.appendChild(script)
})()




/**
 * LIGHTING
 **/
let ambientLight = new THREE.AmbientLight(0xFFFFFF, .7)
scene.add(ambientLight)
let light1 = new THREE.PointLight(0xFF0048, 4, 50)
let light2 = new THREE.PointLight(0x004448, 3, 50)
let light3 = new THREE.PointLight(0x08FF08, 3, 50)
scene.add(light1, light2, light3,)

let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
directionalLight.position.set(2,1,0)
scene.add(directionalLight)

let spotLight = new THREE.SpotLight(0xFF45FF, 2)
spotLight.position.set(0,3,0)
scene.add(spotLight)




/**
 * WINDOW CONTROL
 **/
window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})




/**
 * CREATE GEOMETRY
 **/
let geometry = new THREE.BoxGeometry(2,2,2,)
let cubeMaterials = []

for (let i = 1; i < 7; i++) {
    cubeMaterials[i-1] = new THREE.MeshPhongMaterial({ 
        map: new THREE.TextureLoader().load(`../assets/images/${i}.png`),
        side: THREE.DoubleSide, 
    })
    //cubeMaterials.push(side)
}

//let material = new THREE.MeshBasicMaterial({ color: 0xAAAAFF, wireframe: false, })
let material = new THREE.MeshFaceMaterial(cubeMaterials);

let cube = new THREE.Mesh(geometry, material,)

// let loader = new THREE.ObjectLoader();
// loader.load('../assets/models/jupiter.json', (object) => { scene.add(object) })





/**
 * SKYBOX 
 **/
// let geometry = new THREE.CubeGeometry(10000,10000,10000)
// let cubeMaterials = []
// for (let i = 1; i < 7; i++) {
//     cubeMaterials[i-1] = new THREE.MeshBasicMaterial({ 
//             map: new THREE.TextureLoader().load(`../assets/images/skybox/${i}.png`),
//             side: THREE.DoubleSide,
//     })
// }
// let cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials)
// let cube = new THREE.Mesh(geometry, cubeMaterials)


scene.add(cube)




/**
 * METHODS
 **/

//logic
let update = () => {
    let time = Date.now() * 0.0005
    light1.position.x = Math.sin(time * 0.7) * 30
    light1.position.y = Math.cos(time * 0.5) * 40
    light1.position.z = Math.cos(time * 0.3) * 30

    light2.position.x = Math.cos(time * 0.3) * 30
    light2.position.y = Math.sin(time * 0.7) * 40
    light2.position.z = Math.sin(time * 0.3) * 30

    light3.position.x = Math.sin(time * 0.3) * 30
    light3.position.y = Math.cos(time * 0.5) * 40
    light3.position.z = Math.sin(time * 0.7) * 30
}

//draw scene
let render = () => {
    // cube.rotation.y += 0.01
    // cube.rotation.x += 0.01
    renderer.render(scene, camera)
}

//update, render, repeat
let GameLoop = () => {
    requestAnimationFrame(GameLoop)

    update()
    render()
}
GameLoop()

