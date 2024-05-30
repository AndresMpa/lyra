const {
  app,
  shell,
  screen,
  ipcMain,
  BrowserWindow,
  Menu,
} = require("electron/main");
const path = require("node:path");
const { spawn } = require("child_process");

const config = require("./utils/config");

const { getRAMUsage } = require("./OS/RAM");
const { getCPUUsage } = require("./OS/CPU");
const { getDiskUsage } = require("./OS/Disk");

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 800,
    minWidth: 362,
    height: height,
    minHeight: height,
    webPreferences: {
      focusStyle: false,
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "./preloader/preload.js"),
    },
    icon: path.join(__dirname, "assets/app/logo.png"),
  });

  if (config.nodeEnv === "production") {
    Menu.setApplicationMenu(null);
  }

  if (config.nodeEnv === "development") {
    win.webContents.openDevTools();
  }

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

const pythonServer = spawn("python", [
  "-u",
  path.join(__dirname, "..", "backend", "server.py"),
]);

pythonServer.stdout.on("data", (data) => console.log(`stdout: ${data}`));
pythonServer.stderr.on("data", (data) => console.error(`stderr: ${data}`));
pythonServer.on("close", (code) =>
  console.log(`Python server exited with code ${code}`),
);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => pythonServer.kill());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("get-ram-usage", async () => await getRAMUsage());
ipcMain.handle("get-cpu-usage", async () => await getCPUUsage());
ipcMain.handle("get-disk-usage", async () => await getDiskUsage());
