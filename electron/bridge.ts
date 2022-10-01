import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import ProfileDataInterface from './interfaces/ProfileDataInterface';
import ProfileInterface from './interfaces/ProfileInterface';

export const api = {
  createNewProfile: (profileData: ProfileDataInterface) => {
    ipcRenderer.send('CREATE_NEW_PROFILE', profileData);
  },
  getProfiles: () => {
    ipcRenderer.send('GET_PROFILES');
  },
  getProfilesListener: (listener: (event: IpcRendererEvent, profiles: ProfileInterface[]) => void) => {
    ipcRenderer.on('GET_PROFILES', listener);
  },
  startBrowser: (id: string) => {
    ipcRenderer.send('START_BROWSER', id);
  },
  closeBrowser: (id: string) => {
    ipcRenderer.send('CLOSE_BROWSER', id);
  },
  getConfirmations: (id: string) => {
    ipcRenderer.send('GET_CONFIRMATIONS', id);
  },
  getConfirmationsListener: (listener: (event: IpcRendererEvent, confirmations: any) => void) => {
    ipcRenderer.on('GET_CONFIRMATIONS', listener);
  },

  errorListener: (listener: (event: IpcRendererEvent, error: string) => void) => {
    ipcRenderer.on('ERROR', listener);
  },

  send: (stream: string, data: any) => {
    ipcRenderer.send(stream, data);
  },
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api);