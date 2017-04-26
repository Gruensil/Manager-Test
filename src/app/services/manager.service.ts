import { Injectable, OnInit} from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { DeviceAPI } from './deviceAPI.service';
import { DeviceService } from './device.service';
import { Profile } from '../profile/profile';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ManagerService implements OnInit {
    private profile: Profile;
    private address: Subscription; 
    private lightLevel: Subscription;
    private online: Subscription;
    private platform: Subscription;
    private windowWidth: Subscription;
    private charging: Subscription;

    private timeInit: number = 0;       //initialization for the Timer
    private timeFast: number = 5000;    //update Time for the Fast Update in ms
    private timeSlow: number = 50000;   //update Time for the Slow Update in ms

    constructor(private geolocationService: GeolocationService, private deviceAPI: DeviceAPI, private deviceService: DeviceService) {

        //new Profile ist initialized
        this.profile = new Profile();
        
        //Manager subscribes to the API and pushes it to the Profile
        this.address = this.geolocationService.subject.subscribe(address => {
            this.profile.getEnvironment().setAddress(address);
        });

        this.lightLevel = this.deviceAPI.subject.subscribe(ambientLight => {
            this.profile.getEnvironment().setBrightnessLevel(ambientLight);
        });

        this.online = this.deviceService.online.subscribe(online => {
            this.profile.getPlatform().setOnline(online);
        });

        this.platform = this.deviceService.platform.subscribe(platform => {
            this.profile.getPlatform().setPlatformType(platform);
        });

        this.windowWidth = this.deviceService.windowWidth.subscribe(windowWidth => {
            this.profile.getPlatform().setWindowWidth(windowWidth);
        });

        this.charging = this.deviceService.charging.subscribe(charging => {
            this.profile.getPlatform().setCharging(charging);
        });
        
        
        //Manager checks APIs fast
        let timerFast = Observable.timer(this.timeInit,this.timeFast);
        timerFast.subscribe(t => {
            console.log(t);
            this.fast();
        });

        //Manager checks APIs slow
        let timerSlow = Observable.timer(this.timeInit,this.timeSlow);
        timerSlow.subscribe(t => {
            console.log(t);
            this.slow();
        });
    }

    ngOnInit(){
        
    }

    //The APIs that should be checked fast
    fast(){
        this.geolocationService.getAddress();
        this.deviceService.getOnline();
        this.deviceService.getPlatform();
        this.deviceService.getWindowWidth();
    }

    //The APIs that should be checked slow
    slow(){

    }

    //returns Profile instance
    getProfile(){
        return this.profile;
    }        
}