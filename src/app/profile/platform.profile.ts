// platform context
export class PlatformProfile {
    private online: boolean;
    private platform: string;
    private windowWidth: number;
    private charging: boolean;

    constructor(){};

    // set platform type to 'mobile' or 'desktop'
    public setPlatformType(v: string){
        this.platform = v;
    };

    // get platform type
    public getPlatformType(): string{
        return this.platform;
    };

    public setOnline(v: boolean){
        this.online = v;
    };

    public getOnline(): boolean{
        return this.online;
    };

    public setWindowWidth(v: number){
        this.windowWidth = v;
    };

    public getWindowWidth(): number{
        return this.windowWidth;
    };

    public setCharging(v: boolean){
        this.charging = v;
    };

    public getCharging(): boolean{
        return this.charging;
    };
}