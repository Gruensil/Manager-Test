// environment context
import{ Level } from '../types/Level';

export class EnvironmentProfile {
    private address: string;
    private brightnessLevel: Level;
    
    constructor(){};

    // set brightness on a scale from 0 to 100;
    public setBrightnessLevel(v: Level){
        this.brightnessLevel = v;
    };

    // returns brightness level
    public getBrightnessLevel(): Level{
        return this.brightnessLevel;
    }

    public setAddress(v: string){
        this.address = v;
    }

    public getAddress(): string{
        return this.address;
    }
}
