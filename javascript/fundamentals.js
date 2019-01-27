let example = (() => {

    let scene       = new THREE.Scene()
    let renderer    = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer()
    let light       = new THREE.AmbientLight(0xFFFFFF)
    let camera
    let box

    const initScene = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.getElementById('webgl-container').appendChild(renderer.domElement)

        scene.add(light)
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000)

        camera.position.z = 100;
        scene.add(camera)


        // GEOMETRY

        // CUBE
        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),
            new THREE.MeshBasicMaterial({ color: 0xFF00000 })
        )
        box.name = 'box'
        scene.add(box);


        // SPHERE
        // let material = new THREE.MeshBasicMaterial({
        //     color: 0xFF0000,
        //     wireframe: true,
        // })
        // sphere = new THREE.Mesh(
        //     new THREE.SphereGeometry(300, 150, 150),
        //     material
        // )
        // scene.add(sphere);


        // CUSTOM / TRIANGE
        // let material = new THREE.MeshBasicMaterial({
        //     vertexColors: THREE.vertexColors,
        //     side: THREE.DoubleSide,
        // })

        // let triangleGeom = new THREE.Geometry()
        
        // triangleGeom.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0))
        // triangleGeom.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0))
        // triangleGeom.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0))
        
        // triangleGeom.faces.push(new THREE.Face3(0, 1, 2))
        
        // triangleGeom.faces[0].vertexColors[0] = new THREE.Color(0xFF0000)
        // triangleGeom.faces[0].vertexColors[1] = new THREE.Color(0x00FF00)
        // triangleGeom.faces[0].vertexColors[2] = new THREE.Color(0x0000FF)

        // manualGeometry = new THREE.Mesh(triangleGeom, material)
        // scene.add(manualGeometry);


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

        render()
    }
    const render = () => {
        box.rotation.y += 0.01
        //sphere.rotation.y += 0.001

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    window.onload = initScene

    return {
        scene: scene,
    }
})()