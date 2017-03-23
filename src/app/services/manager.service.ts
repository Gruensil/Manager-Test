import { Injectable } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { Profile } from '../profile/profile';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ManagerService {
    private profile: Profile;
    private subscription: Subscription

    constructor(public geolocationService: GeolocationService) {
        this.profile = new Profile();
        this.subscription = this.geolocationService.subject.subscribe(address => {
            this.profile.getEnvironment().setAddress(address);
        });
    }

    getProfile(){
        return this.profile;
    }        
}