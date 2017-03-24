import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';
import { Level } from '../types/Level';

@Injectable()
export class LightService {

    private lightLevel: Level = 1;
    private _subject: BehaviorSubject<Level> = new BehaviorSubject(1);
    public subject: Observable<Level> = this._subject.asObservable();
    
    constructor() { 
        window.addEventListener('devicelight', event => {
            var html = document.getElementsByTagName('html')[0];
            if (event.value > 300) {
                this.lightLevel = 2;
            }else if(event.value > 100){
                    this.lightLevel = 1;
            }else{
                this.lightLevel = 0;
            }

            this.getLightLevel();
        });     
    }

    getLightLevel(){
        this._subject.next(this.lightLevel);
    }
}