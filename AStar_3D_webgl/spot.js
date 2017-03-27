// An object to describe a spot in the grid
function Spot(i, j, z, partcle_indexes) {

    // Location
    this.i = i;
    this.j = j;
    this.z = z;

    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;

    //an array of particles indexes in the original geometry array
    this.indexes = partcle_indexes;

    // Neighbors
    this.neighbors = [];

    // Where did I come from?
    this.previous = undefined;

    // Am I an wall?
    this.wall = false;
    if (Math.random()<0.1) {
        this.wall = true;
    }

    // ??? Return the color based on different sections???
    // this.showReturn = function() {
    //     if (this.wall) {
    //         var col = {
    //             r: 0,
    //             g: 0,
    //             b: 0
    //         };
    //         return col
    //     } else  {
    //         return
    //     }
    // }

    // Figure out who my neighbors are
    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;
        var z = this.z;
        //same z face, 8/26 neighbors
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j][z].spot);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j][z].spot);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1][z].spot);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1][z].spot);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1][z].spot);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1][z].spot);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1][z].spot);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1][z].spot);
        }
        //forward z face 9/26 neighbors
        if (z < depths - 1) {
            this.neighbors.push(grid[i][j][z + 1].spot);
        }
        if (i < cols - 1 && z < depths - 1) {
            this.neighbors.push(grid[i + 1][j][z + 1].spot);
        }
        if (i > 0 && z < depths - 1) {
            this.neighbors.push(grid[i - 1][j][z + 1].spot);
        }
        if (j < rows - 1 && z < depths - 1) {
            this.neighbors.push(grid[i][j + 1][z + 1].spot);
        }
        if (j > 0 && z < depths - 1) {
            this.neighbors.push(grid[i][j - 1][z + 1].spot);
        }
        if (i > 0 && j > 0 && z < depths - 1) {
            this.neighbors.push(grid[i - 1][j - 1][z + 1].spot);
        }
        if (i < cols - 1 && j > 0 && z < depths - 1) {
            this.neighbors.push(grid[i + 1][j - 1][z + 1].spot);
        }
        if (i > 0 && j < rows - 1 && z < depths - 1) {
            this.neighbors.push(grid[i - 1][j + 1][z + 1].spot);
        }
        if (i < cols - 1 && j < rows - 1 && z < depths - 1) {
            this.neighbors.push(grid[i + 1][j + 1][z + 1].spot);
        }

        // backward z face, 9/26 neighbors
        if (z > 0) {
            this.neighbors.push(grid[i][j][z - 1].spot);
        }
        if (i < cols - 1 && z > 0) {
            this.neighbors.push(grid[i + 1][j][z - 1].spot);
        }
        if (i > 0 && z > 0) {
            this.neighbors.push(grid[i - 1][j][z - 1].spot);
        }
        if (j < rows - 1 && z > 0) {
            this.neighbors.push(grid[i][j + 1][z - 1].spot);
        }
        if (j > 0 && z > 0) {
            this.neighbors.push(grid[i][j - 1][z - 1].spot);
        }
        if (i > 0 && j > 0 && z > 0) {
            this.neighbors.push(grid[i - 1][j - 1][z - 1].spot);
        }
        if (i < cols - 1 && j > 0 && z > 0) {
            this.neighbors.push(grid[i + 1][j - 1][z - 1].spot);
        }
        if (i > 0 && j < rows - 1 && z > 0) {
            this.neighbors.push(grid[i - 1][j + 1][z - 1].spot);
        }
        if (i < cols - 1 && j < rows - 1 && z > 0) {
            this.neighbors.push(grid[i + 1][j + 1][z - 1].spot);
        }

    }
}
