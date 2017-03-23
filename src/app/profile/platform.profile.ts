// platform context
export class PlatformProfile {
    public online: boolean;
    public platform: string;

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
}