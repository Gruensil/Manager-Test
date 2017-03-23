import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile';
import { ManagerService } from './services/manager.service';

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
            <button type="button" (click)="geo()">Geolocation</button>
        </div>
    `,
    providers: []
})
export class ContextUi implements OnInit {
    profile: Profile;

    emotion: string;
    type: string;
    brightness: number;
    address: string;

    constructor(private managerService: ManagerService) {
        this.profile = managerService.getProfile();
    }

    ngOnInit(): void {
        this.updateData();        
    }

    change(){
        this.updateData();
    }

    updateData(){
        this.emotion = this.profile.getUser().getEmotion();
        this.type = this.profile.getPlatform().getPlatformType();
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
        this.address = this.profile.getEnvironment().getAddress();
    }

    geo(){
        this.managerService.geolocationService.getAddress();
    }
}