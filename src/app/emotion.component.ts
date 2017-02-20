import { Component } from '@angular/core';

declare var affdex: any;
declare var $: any;

@Component({
  selector: 'emotion',
  template: `
      <div class="container-fluid">
        <div class="row">
        <div class="col-md-8" id="affdex_elements" style="width:680px;height:480px;"></div>
        </div>
        <div>
        <button id="start" (click)="onStart()">Start</button>
        <button id="stop" (click)="onStop()">Stop</button>
        <button id="reset" (click)="onReset()">Reset</button>
        <h3>Affectiva JS SDK CameraDetector to track different emotions.</h3>
        <p>
            Hallo Welt!
        </p>
        </div>
    </div>
  `
})

export class EmotionComponent {

     // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    private divRoot = $("#affdex_elements")[0];
    private width = 640;
    private height = 480;
    private faceMode = affdex.FaceDetectorMode.LARGE_FACES;
    //Construct a CameraDetector and specify the image width / height and face detector mode.
    private detector = new affdex.CameraDetector(this.divRoot, this.width, this.height, this.faceMode);

    constructor(){
         //Enable detection of all Expressions, Emotions and Emojis classifiers.
        this.detector.detectAllEmotions();
        this.detector.detectAllExpressions();
        this.detector.detectAllEmojis();
        this.detector.detectAllAppearance();
        
        //Add a callback to notify when the detector is initialized and ready for runing.
        this.detector.addEventListener("onInitializeSuccess", function() {
            this.log('#logs', "The detector reports initialized");
            //Display canvas instead of video feed because we want to draw the feature points on it
            $("#face_video_canvas").css("display", "block");
            $("#face_video").css("display", "none");
        });

        //Add a callback to notify when camera access is allowed
        this.detector.addEventListener("onWebcamConnectSuccess", function() {
        this.log('#logs', "Webcam access allowed");
        });

        //Add a callback to notify when camera access is denied
        this.detector.addEventListener("onWebcamConnectFailure", function() {
        this.log('#logs', "webcam denied");
        console.log("Webcam access denied");
        });

        //Add a callback to notify when detector is stopped
        this.detector.addEventListener("onStopSuccess", function() {
        this.log('#logs', "The detector reports stopped");
        $("#results").html("");
        });

        //Add a callback to receive the results from processing an image.
        //The faces object contains the list of the faces detected in an image.
        //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
        this.detector.addEventListener("onImageResultsSuccess", function(faces: any, image: any, timestamp:any) {
        $('#results').html("");
        this.log('#results', "Timestamp: " + timestamp.toFixed(2));
        this.log('#results', "Number of faces found: " + faces.length);
        if (faces.length > 0) {
            this.log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
            this.log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            this.log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
            return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            this.log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
            this.drawFeaturePoints(image, faces[0].featurePoints);
        }
        });
    
    }  

    

    public log(node_name: any, msg: any) {
        console.log(msg);
    }

    //function executes when Start button is pushed.
    public onStart() {
    if (this.detector && !this.detector.isRunning) {
        $("#logs").html("");
        console.log(this.detector);
        console.log(this.detector.start());
    }
    this.log('#logs', "Clicked the start button");
    }

    //function executes when the Stop button is pushed.
    public onStop() {
    this.log('#logs', "Clicked the stop button");
    if (this.detector && this.detector.isRunning) {
        this.detector.removeEventListener();
        this.detector.stop();
    }
    };

    //function executes when the Reset button is pushed.
    public onReset() {
    this.log('#logs', "Clicked the reset button");
    if (this.detector && this.detector.isRunning) {
        this.detector.reset();

        $('#results').html("");
    }
    };

    

    //Draw the detected facial feature points on the image
    public drawFeaturePoints(img:any, featurePoints:any) {
        var contxt = $('#face_video_canvas')[0].getContext('2d');

        var hRatio = contxt.canvas.width / img.width;
        var vRatio = contxt.canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);

        contxt.strokeStyle = "#FFFFFF";
        for (var id in featurePoints) {
            contxt.beginPath();
            contxt.arc(featurePoints[id].x,
            featurePoints[id].y, 2, 0, 2 * Math.PI);
            contxt.stroke();

        }
    }
}