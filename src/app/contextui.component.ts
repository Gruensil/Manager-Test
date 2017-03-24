import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile';
import { ManagerService } from './services/manager.service';
import { Level } from './types/Level';

@Component({
    selector: 'contextUi',
    template: `
        <div>
            <h1>This is a Context Dashboard</h1>

            <h2>Profile:</h2>
            <p>emotion: {{emotion}}</p>

            <h2>Platform:</h2>
            <p>type: {{platform}}</p>
            <p>windowWidth: {{windowWidth}}</p>
            <p>online: {{online}}</p>
            <p>charging: {{charging}}</p>
            

            <h2>Environment:</h2>
            <p> brightness: {{brightness}} </p>
            <p> address: {{address}} </p>            
        </div>
        <div>
            <button type="button" (click)="change()">Update</button>
        </div>
    `,
    providers: []
})
export class ContextUi implements OnInit {
    profile: Profile;

    emotion: string;
    platform: string;
    windowWidth: number;
    online: boolean;
    brightness: Level;
    address: string;
    charging: boolean;

    constructor(private managerService: ManagerService) {
        this.profile = managerService.getProfile();
    }

    ngOnInit() {
        this.updateData();        
    }

    change(){
        this.updateData();
    }

    updateData(){
        this.emotion = this.profile.getUser().getEmotion();
        this.platform = this.profile.getPlatform().getPlatformType();
        this.online = this.profile.getPlatform().getOnline();
        this.windowWidth = this.profile.getPlatform().getWindowWidth();
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
        this.address = this.profile.getEnvironment().getAddress();
        this.charging = this.profile.getPlatform().getCharging();
    }
}