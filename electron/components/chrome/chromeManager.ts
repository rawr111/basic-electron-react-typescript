import ProfileInterface from "../../interfaces/ProfileInterface";
import Chrome from "./Chrome";

class ChromeManager {
    browsers: Chrome[];

    constructor() {
        this.browsers = [];
    }

    getByProfileId(id: string): Chrome | null {
        for (var browser of this.browsers) {
            if (browser.profile.id === id) {
                return browser;
            }
        }
        return null;
    }
    addBrowser(profile: ProfileInterface){
        const isAlreadyExist = this.getByProfileId(profile.id);
        if (isAlreadyExist){
            throw new Error(`Browser ${profile.id} already exist`);
        }
        const browser = new Chrome({windowSettings: {width: 1920, height: 1080}}, profile);
        browser.on('close', ()=>{
            console.log(`${browser.profile.id} closed`);
        })
        this.browsers.push(browser);
    }
}

export default ChromeManager;