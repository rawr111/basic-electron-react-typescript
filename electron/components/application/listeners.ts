import { ipcMain } from 'electron';
import ProfileDataInterface from '../../interfaces/ProfileDataInterface';
import generateProfile from '../profile/generateProfile';
import profileManager from '../Profile/profileManager';
import Storage from '../storage/Storage';
const Steamcommunity = require('steamcommunity');

export default () => {
    ipcMain.on('START_BROWSER', async (event, id: string) => {
        try {
            const profile = profileManager.getById(id);
            await profile?.chrome.start();
        } catch (err) {
            console.log(err);
            event.reply('ERROR', err);
        }
    });
    ipcMain.on('CLOSE_BROWSER', async (event, id: string) => {
        try {
            const profile = profileManager.getById(id);
            profile?.chrome.close();
        } catch (err) {
            console.log(err);
            event.reply('ERROR', err);
        }
    });
    ipcMain.on('CREATE_NEW_PROFILE', async (event, profileData: ProfileDataInterface) => {
        try {
            console.log(profileData);
            const profileParams = generateProfile(profileData);
            profileManager.newProfile(profileParams);
        } catch (err) {
            console.log(err);
            event.reply('ERROR', err);
        }
    });
    ipcMain.on('GET_PROFILES', async (event) => {
        try {
            const profiles = profileManager.getAll();
            event.reply('GET_PROFILES', profiles);
        } catch (err) {
            console.log(err);
            event.reply('ERROR', err);
        }
    });
    ipcMain.on('GET_CONFIRMATIONS', async (event, id) => {
        try {
            console.log(id);
            const profile = profileManager.getById(id);
            if (!profile?.sda.isLogin){
                await profile?.sda.login();
            }
            const confirmations = await profile?.sda.getConfirmations();
            console.log(confirmations);
            event.reply('GET_CONFIRMATIONS', confirmations);
        } catch (err) {
            console.log(err);
            event.reply('ERROR', err);
        }
    });
}