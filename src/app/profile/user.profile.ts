export class UserProfile{
    private emotion: string;

    private emotionChecked: boolean;

    constructor()
    {
        this.emotion = "neutral";

        this.setEmotionChecked(false);
    };

    // Set role of user
    public setEmotion(emotion: string){
        this.emotion = emotion;
        this.setEmotionChecked(false);
    };

    // Get role of user
    public getEmotion(): string{
        return this.emotion;
    };

    // Getters and Setters for flags that indicate if rule was already fired once
    public setEmotionChecked(v: boolean){
        this.emotionChecked = v;
    };
   
    public getEmotionChecked(){
        return this.emotionChecked;
    };
    
}