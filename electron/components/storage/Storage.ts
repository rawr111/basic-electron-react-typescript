import path from 'path';
import storage from 'electron-json-storage';
import ProfileInterface from '../../interfaces/ProfileInterface';
storage.setDataPath(path.join(__dirname, '../../storage/profiles'));

class Storage {
    static GetProfiles(): Promise<{ [id: string]: ProfileInterface }> {
        return new Promise((resolve, reject) => {
            storage.getAll((err, profiles) => {
                if (err) {
                    reject(`Cant get profiles: ${err}`);
                } else {
                    resolve(profiles as { [id: string]: ProfileInterface });
                }
            });
        });
    }
    static GetProfileById(id: string): Promise<ProfileInterface | null> {
        return new Promise((resolve, reject) => {
            storage.get(id, (err, profile) => {
                if (err) {
                    return reject(`Cant get profile: ${err}`);
                }
                if (!profile) {
                    return reject(`Cant get profile: profile ${id} doesnt exist.`);
                }
                resolve(profile as ProfileInterface);
            });
        });
    }
    static SaveProfile(profile: ProfileInterface): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.GetProfileById(profile.id).then(savedProfile => {
                console.log(savedProfile);
                if (savedProfile && Object.keys(savedProfile).length !== 0) {
                    reject(`Cant save profile: profile id(${savedProfile.id}) already exist!`);
                } else {
                    storage.set(profile.id, profile, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            }).catch(err => {
                reject(`Cant save profile: ${err}`);
            });
        });
    }
}

export default Storage;