import { ipcMain } from 'electron';
import ProfileDataInterface from '../../interfaces/ProfileDataInterface';
import ProfileInterface from '../../interfaces/ProfileInterface';
import Chrome from '../chrome/Chrome';
import generateProfile from '../profile/generateProfile';
import Storage from '../storage/storage';

export default () => {
    ipcMain.on('CREATE_NEW_PROFILE', async (event, profileData: ProfileDataInterface) => {
        console.log(profileData);
        const profile = generateProfile(profileData);
        await Storage.SaveProfile(profile);
        const chrome = new Chrome({ windowSettings: { width: 1920, height: 1080 } }, profile);
        await chrome.start();
    });
}