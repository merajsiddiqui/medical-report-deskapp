import { BrowserWindow, BrowserWindowConstructorOptions, screen } from 'electron';

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
        let mainScreen =  screen.getPrimaryDisplay();
        let browserWindowOptions : BrowserWindowConstructorOptions = {
            height: mainScreen.size.height,
            width: mainScreen.size.width,
            webPreferences : {
                nodeIntegration: true,
                contextIsolation: false
            }
        };
        App.AppWindow = new App.BrowserWindow(browserWindowOptions);
        App.AppWindow.loadURL('file://' + __dirname + '/assets/pages/index.html');
        App.AppWindow.on('closed', App.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        App.BrowserWindow = browserWindow;
        App.application = app;
        App.application.on('window-all-closed', App.onWindowAllClosed);
        App.application.on('ready', App.onReady);
    }
}