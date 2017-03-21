import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile';
import { GeolocationService } from './services/geolocation.service';

@Component({
    selector: 'contextUi',
    template: `
        <div>
            <h1>This is a Context Dashboard</h1>
            <h2>Profile:</h2>
            <p>emotion: {{emotion}}</p>
            <h2>Platform:</h2>
            <p>type: {{type}}</p>
            <h2>Environment:</h2>
            <p> brightness: {{brightness}} </p>
            <p> address: {{address}} </p>
            
        </div>
        <div>
            <button type="button" (click)="change()">Change</button>
        </div>
    `,
    providers: [GeolocationService]
})
export class ContextUi implements OnInit {
    profile: Profile;
    emotion: string;
    type: string;
    brightness: number;
    address: string;

    constructor(private geolocationService: GeolocationService) {
        this.profile = new Profile();
    }

    ngOnInit(): void {
        this.emotion = this.profile.getUser().getEmotion();
        this.type = this.profile.getPlatform().getPlatformType();
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
        
    }

    change(){
        this.profile.getEnvironment().setBrightnessLevel(this.brightness + 1);
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
        this.profile.getEnvironment().setAddress(this.geolocationService.getAddress());
        this.address = this.profile.getEnvironment().getAddress();
        console.log(this.address);
    }

    
}