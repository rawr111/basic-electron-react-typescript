import ProfileInterface from "../../interfaces/ProfileInterface";
import Profile from "./Profile";
import Storage from '../storage/Storage';

class ProfileManager {
    objects: Profile[];

    constructor() {
        this.objects = [];
    }

    getAll() {
        return this.objects.map(el => el.params);
    }
    async loadProfiles() {
        try {
            const profiles = await Storage.GetProfiles();
            const profilesArray: ProfileInterface[] = Object.values(profiles);
            const objects = [];

            for (var profileParams of profilesArray) {
                const profile = new Profile(profileParams);
                objects.push(profile);
            }
            this.objects = objects;
            return profilesArray;
        } catch (err) {
            throw new Error(`Cant load profiles: ${err}`);
        }
    }
    async newProfile(profileParams: ProfileInterface) {
        try {
            const exProfile = this.getById(profileParams.id);
            if (exProfile) {
                throw new Error(`profile #${profileParams.id} already exist`);
            }
            await Storage.SaveProfile(profileParams);
            const profile = new Profile(profileParams);
            this.objects.push(profile);
            await profile.chrome.saveProfileData();
        } catch (err) {
            throw new Error(`Cant create profile: ${err}`);
        }
    }
    getById(id: string) {
        for (var profile of this.objects) {
            if (profile.params.id === id) {
                return profile;
            }
        }
        return null;
    }
}

export default new ProfileManager();