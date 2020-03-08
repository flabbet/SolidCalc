let scene = new THREE.Scene();
scene.background = new THREE.Color("#2A0F33");
const rendererDiv = document.querySelector("#renderer");
let camera = new THREE.PerspectiveCamera(75, rendererDiv.offsetWidth / rendererDiv.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);

rendererDiv.appendChild(renderer.domElement);

camera.position.z = 2;

let intervals = [];

let mesh = addNewCube(1, 1, 1);

function addNewCube(width, height, depth) {
    let meshGeometry = new THREE.BoxGeometry(width, height, depth);
    let mesh = new THREE.Mesh(meshGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));

    let geometry = new THREE.EdgesGeometry(mesh.geometry);
    let material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    let edges = new THREE.LineSegments(geometry, material);
    mesh.add(edges);
    addToScene(mesh);
    return mesh;
}


function updateMeshScale(x, y, z) {
    intervals.forEach(function(item, index, array) {
        clearInterval(item);
      });
    if (x != null) {
        intervals.push(setInterval(()=> {
            if(Math.abs(x - mesh.scale.x) < 0.01) clearInterval(intervals[intervals.length - 1]);
            mesh.scale.x = lerp(mesh.scale.x, x, 0.05);            
        }, 0, 1));
    }
    if (y != null) {
        intervals.push(setInterval(()=> {
            if(Math.abs(y - mesh.scale.y) < 0.01) clearInterval(intervals[intervals.length - 1]);
            mesh.scale.y = lerp(mesh.scale.y, y, 0.05);            
        }, 0, 1))
    }
    if (z != null) {
        intervals.push(setInterval(()=> {
            if(Math.abs(z - mesh.scale.z) < 0.01) clearInterval(intervals[intervals.length - 1]);
            mesh.scale.z = lerp(mesh.scale.z, z, 0.05);            
        }, 0, 1))
    }
    const newPos = max([Number(mesh.scale.x), Number(mesh.scale.y), Number(mesh.scale.z)]) + 1;

    intervals.push(setInterval(()=> {
        if(Math.abs(newPos - camera.position.z) < 0.01) clearInterval(intervals[intervals.length - 1]);
    camera.position.z = lerp(camera.position.z, newPos, 0.05);
    },0, 1))
}

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }


function max(values){
    let lastMax = 0;
    for (let i = 0; i < values.length; i++) {
        if(values[i] > lastMax){
            lastMax = values[i];
        }
    }
    return lastMax;
}

function addToScene(mesh) {
    clearScene();
    mesh.rotation.x = 0.5;
    mesh.rotation.y = 0.5;
    scene.add(mesh);
}

function clearScene() {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();