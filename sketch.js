let mobilenet;
let classifier;
let video;
let label = ''
let dormir ;
let despertar;
let entrenar;

function modelready(){
  console.log('modelready');
  // mobilenet.predict(video, Result);
}
function videoready(){
  console.log('videoready');
  // classifier.classify(gotResults);

}

function whileTraining(loss){
  if(loss == null){
    console.log('AAA');
    classifier.classify(gotResults);
  }else{
    console.log(loss);
  }
}

function setup() {
  createCanvas(640, 480);
  background(225);
  video = createCapture(VIDEO);
  mobilenet = ml5.featureExtractor('MobileNet', modelready);
  classifier = mobilenet.classification(video, videoready)

  dormir = createButton('dormir');
  dormir.mousePressed(function(){
    classifier.addImage('dormir');
  });

  despertar = createButton('despertar');
  despertar.mousePressed(function(){
    classifier.addImage('despertar');
  });

  entrenar = createButton('entrenar');
  entrenar.mousePressed(function(){
    classifier.train(whileTraining);
  });

}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  }
    console.log(results);
    label = results[0].className;
    // label = result;
    classifier.classify(gotResults);
  }


function draw(){
  background(0);
  image(video,0,0,540,380);
  fill(255);
  textSize(16);
  text(label, 10,height - 10);
}
