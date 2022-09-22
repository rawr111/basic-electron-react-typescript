import { contextBridge, ipcRenderer } from 'electron';
import ProfileDataInterface from './interfaces/ProfileDataInterface';

export const api = {
  createNewProfile: (profileData: ProfileDataInterface) => {
    ipcRenderer.send('CREATE_NEW_PROFILE', profileData);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api);