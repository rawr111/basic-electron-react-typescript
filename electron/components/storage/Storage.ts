import path from 'path';
import storage from 'electron-json-storage';
import ProfileInterface from '../../interfaces/ProfileInterface';
storage.setDataPath(path.join(__dirname, '../../profiles'));

class Storage {
    static GetProfileById(id: string): Promise<ProfileInterface | null> {
        return new Promise((resolve, reject) => {
            storage.get(id, (err, profile) => {
                if (err) {
                    return reject(err);
                }
                if (!profile) {
                    return reject(`Профиля ${id} не существует.`);
                }
                resolve(profile as ProfileInterface);
            });
        });
    }
    static SaveProfile(profile: ProfileInterface): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.GetProfileById(profile.id).then(savedProfile => {
                if (savedProfile){
                    reject(`Профиль с таким id(${savedProfile.id}) уже существует!`);
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
                reject(err);
            });

        });
    }
}

export default Storage;