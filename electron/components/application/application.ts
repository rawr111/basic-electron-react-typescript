import windowsManager from "./windowsManager";
import listeners from "./listeners";
import { app, ipcMain, BrowserWindow, App } from 'electron';

class Application {
    object: App;
    mainWindow: BrowserWindow | null;

    constructor (){
        this.object = app;
        this.mainWindow = null;
    }

    start(cb: Function) {
        app.on('ready', () => {
            this.mainWindow = windowsManager.createMain();
            listeners();
            cb();
        });
    }
}

export default new Application();