import path from 'path';
import storage from 'electron-json-storage';
import ProfileInterface from '../../interfaces/ProfileInterface';
storage.setDataPath(path.join(__dirname, '../../profiles'));

class Storage {
    static GetProfileById(id: string): Promise<ProfileInterface> {
        return new Promise((resolve, reject) => {
            storage.get(id, (err, profile) => {
                if (err || !profile) {
                    reject(err);
                } else {
                    resolve(profile as ProfileInterface);
                }
            });
        });
    }
    static SaveProfile(profile: ProfileInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            storage.set(profile.id, profile, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default Storage;