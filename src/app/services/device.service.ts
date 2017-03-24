import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DeviceService {

    public windowWidth: BehaviorSubject<number> = new BehaviorSubject(0);
    public online: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public platform: BehaviorSubject<string> = new BehaviorSubject("none");
    public charging: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    constructor() {
        
    }

     getWindowWidth(){
        this.windowWidth.next(screen.width);
     }
     getPlatform(){
        this.platform.next(navigator.platform);
     }
     getOnline(){
        this.online.next(navigator.onLine);
     }

     getCharging(){

        //  var charging: boolean;
        //  navigator.getBattery().then(function(battery: any) {

        //     updateChargeInfo();

        //     battery.addEventListener('chargingchange', function(){
        //         updateChargeInfo();
        //     });

        //     function updateChargeInfo(){
        //         console.log("Battery charging? "
        //                     + (battery.charging ? "Yes" : "No"));
        //         this.charging.next(battery.charging);
        //     }
        // });
        
     }


}