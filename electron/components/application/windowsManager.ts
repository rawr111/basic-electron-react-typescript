import electron, { BrowserWindow } from 'electron';
import windowsConfig from './windowsConfig';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class WindowsManager {
    createMain() {
        const mainWindow = new BrowserWindow({
            ...windowsConfig.mainWindow,
            icon: '../../assets/icon.png',
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
            }
        });
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        return mainWindow;
    }
}

export default new WindowsManager();