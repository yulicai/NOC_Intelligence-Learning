var words_array = [];

function preload() {
  //range(-120,120)
    data = loadJSON("2d_vector_result.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    noStroke();
    textSize(14);
}

function draw() {
  background(255);
  words_array = Object.keys(data);
  for(var i = 0; i<words_array.length; i++){
    // var textX = (data[words_array[i]][0]+20)*70;
    // var textY = (data[words_array[i]][1]+20)*40;
    var textX = map(data[words_array[i]][0]*10,-200,200,0,windowWidth);
    var textY = map(data[words_array[i]][1]*10,-200,200,0,windowHeight);
    text(words_array[i],textX,textY);
  }
  // console.log(data[words_array[2]][1]);
}
