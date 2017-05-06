// An object to describe a spot in the grid
function Spot(word, _x, _y) {


    // Location
    this.x = _x;
    this.y = _y;

    // associated word
    this.word = word;

    this.neighborsize = 50;

    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    // Neighbors
    this.neighbors = [];

    // Where did I come from?
    this.previous = undefined;

    // Am I an wall?
    this.wall = false;
    if (random(1) < 0.1) {
        this.wall = true;
    }

    // Display me
    this.show = function(col, size) {
        if (this.wall) {
            fill(0);
            // noStroke();
            stroke('#fae');
            strokeWeight(2);
            textAlign(CENTER);
            textSize(text_size);
            text(this.word, this.x, this.y);
        } else if (col) {
            fill(col);
            // noStroke();
            if (size) {
                textAlign(CENTER);
                textSize(size);
            }
            text(this.word, this.x, this.y);
        } else {
            fill(150);
            // noStroke();
            textAlign(CENTER);
            textSize(text_size);
            text(this.word, this.x, this.y);
        }
    }

    // Figure out who my neighbors are
    this.addNeighbors = function(grid) {
        var x = this.x;
        var y = this.y;
        var neighborCount = 0;
        for (var i = 0; i < grid.length; i++) {
            dis = dist(x, y, grid[i].x, grid[i].y);

            if (dis < this.neighborsize) {
                this.neighbors.push(grid[i]);
                neighborCount++;
            }

        }

        // var i = this.i;
        // var j = this.j;
        // if (i < cols - 1) {
        //     this.neighbors.push(grid[i + 1][j]);
        // }
        // if (i > 0) {
        //     this.neighbors.push(grid[i - 1][j]);
        // }
        // if (j < rows - 1) {
        //     this.neighbors.push(grid[i][j + 1]);
        // }
        // if (j > 0) {
        //     this.neighbors.push(grid[i][j - 1]);
        // }
        // if (i > 0 && j > 0) {
        //     this.neighbors.push(grid[i - 1][j - 1]);
        // }
        // if (i < cols - 1 && j > 0) {
        //     this.neighbors.push(grid[i + 1][j - 1]);
        // }
        // if (i > 0 && j < rows - 1) {
        //     this.neighbors.push(grid[i - 1][j + 1]);
        // }
        // if (i < cols - 1 && j < rows - 1) {
        //     this.neighbors.push(grid[i + 1][j + 1]);
        // }
    }
}
