const { exec, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const backendPath = path.join(__dirname, "backend");
const venvPath = path.join(backendPath, "lyra_backend_env");
const pythonExecutable = "python3";

const createVirtualEnv = (callback) => {
  if (!fs.existsSync(venvPath)) {
    exec(`${pythonExecutable} -m venv ${venvPath}`, (err) => {
      if (err) {
        console.error("Error creating virtual environment:", err);
        return;
      }
      callback();
    });
  } else {
    callback();
  }
};

const installDependencies = (callback) => {
  const pipExecutable = path.join(venvPath, "bin", "pip");
  const requirementsFile = path.join(backendPath, "requirements.txt");

  exec(`${pipExecutable} install -r ${requirementsFile}`, (err) => {
    if (err) {
      console.error("Error installing requirements:", err);
      return;
    }
    callback();
  });
};

const runServerApp = () => {
  const pythonExecutable = path.join(venvPath, "bin", "python");
  const pythonScript = path.join(backendPath, "app.py");

  const pythonServer = spawn(pythonExecutable, ["-u", pythonScript]);

  pythonServer.stdout.on("data", (data) => console.log(`stdout: ${data}`));
  pythonServer.stderr.on("data", (data) => console.error(`stderr: ${data}`));
  pythonServer.on("close", (code) =>
    console.log(`Python server exited with code ${code}`),
  );

  return pythonServer;
};

module.exports = {
  installDependencies,
  createVirtualEnv,
  runServerApp,
};
