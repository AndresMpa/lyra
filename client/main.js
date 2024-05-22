const { screen, shell, app, BrowserWindow } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 800,
    height: height,
    webPreferences: {
      focusStyle: false,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "./preloader/preload.js"),
    },
    icon: path.join(__dirname, "assets/app/logo.png"),
  });

  win.loadFile("index.html");
  win.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
