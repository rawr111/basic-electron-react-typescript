export default {
    mainWindow: {
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        maxWidth: 1920,
        maxHeight: 1080,
        frame: true,
        resizable: true
    },
    salesWindow: {
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        maxWidth: 1920,
        maxHeight: 1080,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: true,
        icon: './assets/icons/sales-channels.png'
    },
    logsWindow: {
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        maxWidth: 1920,
        maxHeight: 1080,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: true,
        icon: './assets/icons/log.png'
    },
    itemsWindow: {
        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,
        maxWidth: 1920,
        maxHeight: 1080,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: true,
        icon: './assets/icons/case.png'
    }
}