import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';
import { Level } from '../types/Level';

@Injectable()
export class LightService {

    private ambientLight: Level = 1;
    private _subject: BehaviorSubject<Level> = new BehaviorSubject(1);
    public subject: Observable<Level> = this._subject.asObservable();
    
    constructor() { 
        window.addEventListener('devicelight', event => {
            var html = document.getElementsByTagName('html')[0];
            if (event.value > 300) {
                this.ambientLight = 2;
            }else if(event.value > 100){
                    this.ambientLight = 1;
            }else{
                this.ambientLight = 0;
            }

            this.getAmbientLight();
        });     
    }

    getAmbientLight(){
        this._subject.next(this.ambientLight);
    }
} 