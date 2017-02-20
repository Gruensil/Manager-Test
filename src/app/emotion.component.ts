import { Component } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

declare var affdex: any;
declare var $: any;

@Component({
  selector: 'emotion',
  template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8" id="affdex_elements" style="width:680px;height:480px;"></div>
            <div class="col-md-4">
                <div style="height:25em;">
                    <strong>EMOTION TRACKING RESULTS</strong>
                    <div id="results" style="word-wrap:break-word;"></div>
                </div>
                <div>
                    <strong>DETECTOR LOG MSGS</strong>
                </div>
                <div id="logs"></div>
            </div>
        </div>
        <div>
            <button id="start" (click)="onStart()">Start</button>
            <button id="stop" (click)="onStop()">Stop</button>
            <button id="reset" (click)="onReset()">Reset</button>
            <button id="detectorLog" (click)="onDetLog()">Detector Log</button>
            <h3>Affectiva JS SDK CameraDetector to track different emotions.</h3>
            <p>
                Intsructions are inserted here.
            </p>
        </div>
    </div>
  `
})

export class EmotionComponent {
    detector: any;

    constructor(){

    };

    public log(node_name: any, msg: any) {
        $(node_name).append("<span>" + msg + "</span><br />");
        console.log(msg);
    }

    //function executes when Init button is pushed. It creates an detector object
    public Init(){
        // SDK Needs to create video and canvas nodes in the DOM in order to function
        // Here we are adding those nodes a predefined div.
        var divRoot = $("#affdex_elements")[0];
        var width = 640;
        var height = 480;
        var faceMode = affdex.FaceDetectorMode.LARGE_FACES;

        //Construct a CameraDetector and specify the image width / height and face detector mode.
        this.detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
        console.log(this.detector);
        //Enable detection of all Expressions, Emotions and Emojis classifiers.
        this.detector.detectAllEmotions();
        this.detector.detectAllExpressions();
        this.detector.detectAllEmojis();
        this.detector.detectAllAppearance();
        
        //Add a callback to notify when the detector is initialized and ready for runing.
        this.detector.addEventListener("onInitializeSuccess", function() {
            () => this.log('#logs', "The detector reports initialized");
            //Display canvas instead of video feed because we want to draw the feature points on it
            $("#face_video_canvas").css("display", "block");
            $("#face_video").css("display", "none");
        });

        //Add a callback to notify when camera access is allowed
        this.detector.addEventListener("onWebcamConnectSuccess", function() {
            () => this.log('#logs', "Webcam access allowed");
        });

        //Add a callback to notify when camera access is denied
        this.detector.addEventListener("onWebcamConnectFailure", function() {
            console.log("webcam was denied.");
            () => this.log('#logs', "webcam denied");
        });

        //Add a callback to notify when detector is stopped
        this.detector.addEventListener("onStopSuccess", function() {
            () => this.log('#logs', "The detector reports stopped");
            $("#results").html("");
        });

        //Add a callback to receive the results from processing an image.
        //The faces object contains the list of the faces detected in an image.
        //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
        this.detector.addEventListener("onImageResultsSuccess", function(faces: any, image: any, timestamp:any) {
            $('#results').html("");
            console.log(()=> this);
            () => this.log('#results', "Timestamp: " + timestamp.toFixed(2));
            () => this.log('#results', "Number of faces found: " + faces.length);
            if (faces.length > 0) {
                () => this.log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
                () => this.log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
                }));
                () => this.log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
                }));
                () => this.log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
                () => this.drawFeaturePoints(image, faces[0].featurePoints);
            }
        });
    }

    //function executes when Start button is pushed.
    public onStart() { 
        if(!this.detector){
            this.Init();
        }            
        //if (this.detector && !this.detector.isRunning) {
            $("#logs").html("");
            this.detector.start();
        //}
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

    public onDetLog() {
        console.log(this.detector);
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