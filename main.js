const {app, BrowserWindow} = require('electron');

// Global reference of the window object.
let mainWindow;

// When Electron finish initialization, create window and load app index.html with size 800x600
app.on('ready', () => {
    	mainWindow = new BrowserWindow({ 
		width: 1680, 
		height: 1050,
                webPreferences: {
			nodeIntegration: false   
		} 
        });
	// Path to your index.html
	mainWindow.loadURL('file://' + __dirname + '/com.famicet.CoinsJsonGenerator/uimodule/webapp/index.html');
});
