var words_array = [];

function preload() {
  //range(-120,120)
    data = loadJSON("2d_vector_result.json");
}

function setup() {
    createCanvas(1400, 1000);
    noLoop();
    noStroke();
    textSize(14);
}

function draw() {
  background(255);
  words_array = Object.keys(data);
  for(var i = 0; i<words_array.length; i++){
    var textX = (data[words_array[i]][0]+200)*4;
    var textY = (data[words_array[i]][1]+150)*3;
    text(words_array[i],textX,textY);
  }
  // console.log(data[words_array[2]][1]);
}
