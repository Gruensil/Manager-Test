import { Injectable, OnInit} from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { Profile } from '../profile/profile';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ManagerService implements OnInit {
    private profile: Profile;
    private address: Subscription; 
    private timeInit: number = 0;          //initialization for the Timer
    private timeFast: number = 6000;    //update Time for the Fast Update in ms
    private timeSlow: number = 50000;   //update Time for the Slow Update in ms

    constructor(private geolocationService: GeolocationService) {

        //new Profile ist initialized
        this.profile = new Profile();
        
        //Manager subscribes to the address-API and pushes it to the Environment
        this.address = this.geolocationService.subject.subscribe(address => {
            this.profile.getEnvironment().setAddress(address);
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
    }

    //The APIs that should be checked slow
    slow(){

    }

    getProfile(){
        return this.profile;
    }        
}