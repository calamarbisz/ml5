let video;
let poseNet;
let pose;
let skeleton;
//let flipVideo;

let brain;
let poseLabel = "A";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  // flipVideo = ml5.flipImage(video)
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 135,
    outputs: 2,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);

//modelo TM
   const modelInfo = {
    model: 'model.json',
    metadata: 'metadata.json',
    weights: 'weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('ready pa clasificar');
  classifyPose();
}
function classifyPose() {
  //si hay una pose:
  if (pose) {
    let inputs = [];
    //todos los puntos estan en keypoints []
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  poseLabel = results[0].label.toUpperCase();
    //console.log(results[0].confidence);
  classifyPose();
  }

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
 image(video, 0, 0);
//DIBUJAR EL ESQUELETO
  //si detecta una pose:
  if (pose) {
    //skeleton tiene dos dimensiones: una con los keypoints y otra con las conexiones
      for (let i= 0; i<skeleton.length; i++) {
       let Sx= skeleton[i][0];
       let Sy= skeleton[i][1];
       stroke(255);
       line(Sx.position.x, Sx.position.y, Sy.position.x,
           Sy.position.y)
        }
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
          fill(0);
          stroke(255);
          ellipse(x, y, 16, 16);
         }
      }
  fill(0,255,0);
  textSize(32);
  text(poseLabel, width / 2, height / 2);
  }
