const { exec } = require("child_process");
const path = require("path");
const os = require("os");

const getDiskUsage = () => {
  return new Promise((resolve, reject) => {
    const homeDir = os.homedir();
    const command = `du -sh ${homeDir}/*`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      const usage = stdout
        .split("\n")
        .filter((line) => line)
        .map((line) => {
          const [size, dir] = line.split("\t");
          return { directory: path.basename(dir), size };
        });

      resolve(usage);
    });
  });
}

module.exports = { getDiskUsage };
