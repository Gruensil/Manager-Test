import { PlatformProfile } from './platform.profile';
import { UserProfile } from './user.profile';
import { EnvironmentProfile } from './environment.profile';

export class Profile {
    public user: UserProfile;
    public platform: PlatformProfile;
    public environment: EnvironmentProfile;

    constructor()
    {
        // initialize context profiles
        this.user = new UserProfile();
        this.platform = new PlatformProfile();
        this.environment = new EnvironmentProfile();
    }

    // get user profile
    public getUser() : UserProfile {
        return this.user;
    }
    
    // get platform profile
    public getPlatform() : PlatformProfile {
        return this.platform;
    }

    // get environment profile
    public getEnvironment() : EnvironmentProfile {
        return this.environment;
    }
}