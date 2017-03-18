import { Component, OnInit } from '@angular/core';
import { Profile } from './profile/profile';

@Component({
    selector: 'contextUi',
    template: `
        <h1>This is an Context Dashboard</h1>
        <h2>Profile:</h2>
        <p>emotion: {{brightness}}</p>
        <h2>Platform:</h2>
        <p>type: {{test}}</p>
        <h2>Environment:</h2>
        <p>brightness: {{test}}</p>
    `,
    providers: []
})
export class ContextUi implements OnInit {
    test: string;
    profile: Profile;
    brightness: number;

    constructor() {
        this.profile = new Profile();
        this.brightness = this.profile.getEnvironment().getBrightnessLevel();
     }

    ngOnInit() { 
        //this.test = "hi"
    }
}