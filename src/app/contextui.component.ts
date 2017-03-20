import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile';

@Component({
    selector: 'contextUi',
    template: `
        <h1>This is a Context Dashboard</h1>
        <h2>Profile:</h2>
        <p>emotion: {{emotion}}</p>
        <h2>Platform:</h2>
        <p>type: {{type}}</p>
        <h2>Environment:</h2>
        <p>brightness: {{brightness}}</p>
    `,
    providers: []
})
export class ContextUi implements OnInit {
    profile: Profile;
    emotion: string;
    type: string;
    brightness: number;

    constructor() {
        this.profile = new Profile();
        this.emotion = this.profile.getUser().getEmotion();
        this.type = this.profile.getPlatform().getPlatformType();
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
     }

    ngOnInit() { 
        //this.test = "hi"
    }
}