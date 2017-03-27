// Function to delete element from the array
function removeFromArray(arr, elt) {
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
    var d = Utils.distanceBetween3DPoints(a.i, a.j, a.z, b.i, b.j, b.z);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}



// How many columns and rows?
var cols = 10;
var rows = 10;
var depths = 10;

// This will the 3D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h, d;

// The road taken
var path = [];
//assiociate with threejs parameters
var width = 400;
var height = 400;
var depth = 400;

//three js declaration
var container;
var renderer, scene, camera, stats;
var particles, uniforms;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0;
var mouseY = 0;
var PARTICLE_SIZE = 20;
init();
loop();

function init() {
    ///////// THREE JS INIT PART /////////
    container = document.getElementById('container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 800;
    var geometries = [];
    var layer_number = width / 100;
    //three layers of boxes
    for (var l = 0; l < layer_number; l++) {
        //l stands for layers, which means how many box geometries
        var weight = (l + 1) / layer_number;
        var resolution = Math.floor(weight * 16);
        geometries.push(new THREE.BoxGeometry(
            width * weight,
            height * weight,
            depth * weight,
            resolution, resolution, resolution));
    }
    var vertices = [];
    for (var i = 0; i < geometries.length; i++) {
        vertices = vertices.concat(geometries[i].vertices);
    }
    // var geometry1 = new THREE.BoxGeometry(width, height, depth, 16, 16, 16);
    // var geometry2 = new THREE.BoxGeometry(0.75 * width, 0.75 * height, 0.75 * depth, 12, 12, 12);
    // var geometry3 = new THREE.BoxGeometry(0.5 * width, 0.5 * height, 0.5 * depth, 8, 8, 8);
    //use concat function in javaScript to combine all the arrays together
    // var vertices = geometry1.vertices.concat(geometry2.vertices.concat(geometry3.vertices));
    // console.log("vertices length: " + vertices.length);
    var positions = new Float32Array(vertices.length * 3);
    var colors = new Float32Array(vertices.length * 3);
    var sizes = new Float32Array(vertices.length);
    var vertex;
    var color = new THREE.Color();
    for (var i = 0, l = vertices.length; i < l; i++) {
        vertex = vertices[i];
        vertex.toArray(positions, i * 3);
        color.r = 0.01 + 0.1 * (i / l);
        color.g = 0.5;
        color.b = 0.3;
        color.toArray(colors, i * 3);
        sizes[i] = PARTICLE_SIZE * 0.5;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

    //
    var material = new THREE.ShaderMaterial({
        uniforms: {
            color: {
                value: new THREE.Color(0xffffff)
            },
            texture: {
                value: new THREE.TextureLoader().load("textures/disc.png")
            }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        alphaTest: 0.9
    });
    //
    particles = new THREE.Points(geometry, material);
    //size length 2790
    //positions length 8370
    // console.log('positions length: ' + geometry.attributes.position.array.length);
    //pass the index less then 2790
    // console.log('positions: ' + geometry.attributes.position.getX(2770));
    scene.add(particles);
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    //
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);



    ///////// A STAR ALGORITHYM INIT PART /////////
    // Grid cell size
    w = width / cols; //20
    h = height / rows;
    d = depth / depths;

    // Making a 3D array
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Array(depths);
        }
    }

    //we have an empty array holding objects {indexes: , spot: }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            for (var z = 0; z < depths; z++) {
                //>>>>>>>>>?????
                //initiate each object
                grid[i][j][z] = {};
                //indexes is holding the original indexes of the particles in this spot in the geometry
                grid[i][j][z].indexes = [];
                grid[i][j][z].spot = undefined;
            }
        }
    }

    //counting the numbers of particles in each grid/spot
    for (var g = 0; g < particles.geometry.attributes.size.array.length; g++) {
        var i, j, k;
        //i, j, z are the colums rows depths index for each partical
        //which box it belongs to
        //https://threejs.org/docs/api/math/Vector3.html
        i = Math.floor((particles.geometry.attributes.position.getX(g) + width / 2) / w);
        j = Math.floor((particles.geometry.attributes.position.getY(g) + height / 2) / h);
        k = Math.floor((particles.geometry.attributes.position.getZ(g) + depth / 2) / d);
        // console.log("i= " + i + "; j= " + j + "; k= " + k);
        if (i < cols && j < rows && k < depths) {
            grid[i][j][k].indexes.push(g);
        }

    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            for (var z = 0; z < depths; z++) {
                grid[i][j][z].spot = new Spot(i, j, z, grid[i][j][z].indexes);
            }
        }
    }

    // All the neighbors
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            for (var z = 0; z < depths; z++) {
                grid[i][j][z].spot.addNeighbors(grid);
            }
        }
    }


    // Start and end
    start = grid[0][0][0].spot;
    end = grid[cols - 1][rows - 1][depths - 1].spot;
    start.wall = false;
    end.wall = false;

    // openSet starts with beginning only
    openSet.push(start);
}

// a variable to hold requestAnimationFrame object
var myReq;
// a variable to hold the current spot being evaluating
var current;

function loop() {

    // Am I still searching?
    if (openSet.length > 0) {
        // Best next option
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        current = openSet[winner];

        // Did I finish?
        if (current === end) {
            noLoop();
            console.log("DONE!");
        }

        // Best option moves from openSet to closedSet
        removeFromArray(openSet, current);
        closedSet.push(current);

        // Check all the neighbors
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            // Valid next spot?
            //mark
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + heuristic(neighbor, current);

                // Is this a better path than before?
                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                // Yes, it's a better path
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

        }
        // Uh oh, no solution
    } else {
        console.log('no solution!!!');
        noLoop();
        return;
    }

    // Find the path by working backwards
    //the things in path are the spots
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }


    render();
    myReq = requestAnimationFrame(loop);
}


function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    // particles.rotation.x += 0.0005;
    // particles.rotation.y += 0.001;
    var geometry = particles.geometry;
    var attributes = geometry.attributes;
    var current_path_indexes = []
    for (var s = 0; s < path.length; s++) {
        for (var p = 0; p < path[s].indexes.length; p++) {
            var geometry_index = path[s].indexes[p];
            current_path_indexes.push(geometry_index);
            attributes.size.array[geometry_index] = PARTICLE_SIZE * 2.5;
            attributes.customColor.array[geometry_index * 3] = 0.9;

            attributes.customColor.needsUpdate = true;
            attributes.size.needsUpdate = true;
        }
    }
    for (var i = 0; i < attributes.size.array.length; i++) {
        if (!current_path_indexes.includes(i)) {
            // attributes.customColor.array[i * 3] = 0.3;
            attributes.size.array[i] = PARTICLE_SIZE;
            // attributes.customColor.needsUpdate = true;
            attributes.size.needsUpdate = true;
        }
    }

    renderer.render(scene, camera);
}

function noLoop() {
    if (myReq) {
        cancelAnimationFrame(myReq);
        myReq = undefined;
    }
}



//////// EVENT FUNCTIONS ////////
function onDocumentMouseMove(event) {
    event.preventDefault();

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
