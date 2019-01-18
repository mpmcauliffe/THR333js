

let scene       = new THREE.Scene()
let camera      = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer    = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
controls = new THREE.OrbitControls(camera, renderer.domElement)
camera.position.z = 3
camera.position.y = .5

window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

let geometry = new THREE.BoxGeometry(1,1,1,)
let cubeMaterials = []

for (let i = 1; i < 7; i++) {
    cubeMaterials[i-1] = new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load(`../assets/images/${i}.png`),
        side: THREE.DoubleSide, 
    })
    //cubeMaterials.push(side)
}
console.log(cubeMaterials)
//let material = new THREE.MeshBasicMaterial({ color: 0xAAAAFF, wireframe: false, })
let material = new THREE.MeshFaceMaterial(cubeMaterials);

let cube = new THREE.Mesh(geometry, material,)

scene.add(cube)

//logic
let update = () => {

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

