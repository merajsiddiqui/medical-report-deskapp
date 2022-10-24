import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export default class App {

    static AppWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow:any;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            App.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        App.AppWindow = null;
    }

    private static onReady() {
        let browserWindowOptions : BrowserWindowConstructorOptions = {
            width : 800,
            height: 600,

            webPreferences : {
                nodeIntegration: true,
                contextIsolation: false
            }
        };
        App.AppWindow = new App.BrowserWindow(browserWindowOptions);
        console.log('file://' + __dirname + '/pages/index.html');
        App.AppWindow.loadURL('file://' + __dirname + '/pages/index.html');
        App.AppWindow.on('closed', App.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        App.BrowserWindow = browserWindow;
        App.application = app;
        App.application.on('window-all-closed', App.onWindowAllClosed);
        App.application.on('ready', App.onReady);
    }
}