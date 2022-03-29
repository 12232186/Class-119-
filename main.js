function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(350,350);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX,pmouseY, mouseX,mouseY);
    }
}


function clearCanvas(){
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error,Results) {
   if (error) {
    console.error(error);
   } else {
       console.log(Results);
       document.getElementById("label").innerHTML = 'label:' + Results[0].label;

       document.getElementById("confidence").innerHTML = 'confidence:' + Math.round(Results[0].confidence * 100 ) + '%';
       utterThis = new SpeechSynthesisUtterance(Results[0].label);
synth.speak (utterThis);
   }
}