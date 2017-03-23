import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DeviceService {

    private browser: string;
    private _subject: BehaviorSubject<string> = new BehaviorSubject("");
    public subject: Observable<string> = this._subject.asObservable();

    public online: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public platform: BehaviorSubject<string> = new BehaviorSubject("");
    
    constructor() {
        
    }

     getBrowser(){
        this._subject.next(navigator.appName);
     }
     getPlatform(){
        this.platform.next(navigator.platform);
     }
     getOnline(){
        this.online.next(navigator.onLine);
     }


}