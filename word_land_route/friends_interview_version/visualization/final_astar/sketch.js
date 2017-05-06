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
    var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}


function preload() {
    //range(-120,120)
    data = loadJSON("2d_vector_result.json");

}
var text_size = 30;
// How many columns and rows?
var cols;
var rows;

// This will the 2D array
var grid = new Array(cols);

// Open and closed set
var openSet = [];
var closedSet = [];

// Start and end
var start;
var end;

var start_index;
var end_index;

var start_word = "happy";
var end_word = "summer";
// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];

var words_array = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(30);
    words_array = Object.keys(data);
    cols = words_array.length;
    rows = words_array.length;
    console.log(cols);

    // Making an array
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array();
    }

    for (var i = 0; i < cols; i++) {
        var textX = (data[words_array[i]][0] + 120) * 7;
        var textY = (data[words_array[i]][1] + 120) * 4;
        var word = words_array[i];
        fill(0);
        // noStroke();
        textAlign(CENTER);
        textSize(text_size);
        text(words_array[i], textX, textY);
        grid[i] = new Spot(word, textX, textY);
    }


    // All the neighbors
    for (var i = 0; i < cols; i++) {
        grid[i].addNeighbors(grid);
    }
    // looking for index for start and end
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].word == start_word) start_index = i;
        else if (grid[i].word == end_word) end_index = i;
        // print("start index= "+start_index);
        // print("end index = " + end_index);
    }

    start = grid[start_index];
    end = grid[end_index];

    start.wall = false;
    end.wall = false;
    // openSet starts with beginning only
    openSet.push(start);

}


var last = null;
var away = null;
function draw() {

    // Am I still searching?
    if (openSet.length > 0) {

        // Best next option
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        last = current;
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
                    last = neighbor.previous;
                }
            }

        }
        // Uh oh, no solution
    } else {
        fill(0);
        noStroke();
        // rectMode(CENTER);
        rect(width / 2,0,800,440);
        textSize(40);
        away = dist(last.x, last.y, end.x, end.y);
        print("away=" +away);
        fill(220);
        text("sorry,human, no solution, \nyou are still \n"+away+" pixel meters away, \nfrom your goal.", width / 2, 40);
        console.log('no solution');

        noLoop();
        return;
    }

    // Draw current state of everything
    background(255);

    for (var i = 0; i < cols; i++) {
        grid[i].show();

    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 190, 0), textSize);
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0), textSize);
    }
    for (var i = 0; i < path.length; i++) {
        path[i].show(color(255, 50, 0), 50);
        textSize(30);
        fill(20);
        rectMode(CENTER);
        rect(100, 40 + i * text_size, text_size * 3, text_size)
        fill(200);
        text(path[i].word, 100, 40 + i * text_size);
    }
    start.show(color(255, 50, 0), 75);
    end.show(color(255, 50, 0), 75);

    // Find the path by working backwards
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }


    // for (var i = 0; i < path.length; i++) {
    // path[i].show(color(0, 0, 255));
    //}

    // Drawing path as continuous line
    noFill();
    stroke(255, 50, 0);
    strokeWeight(3);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();



}
