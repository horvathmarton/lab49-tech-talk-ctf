const {
  existsSync,
  statSync,
  mkdirSync,
  readdirSync,
  copyFileSync,
} = require("fs");
const { join } = require("path");

const copyFolderSync = (src, dest) => {
  const exists = existsSync(src);
  const stats = exists && statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    mkdirSync(dest);
    readdirSync(src).forEach((childItemName) =>
      copyFolderSync(join(src, childItemName), join(dest, childItemName))
    );
  } else {
    copyFileSync(src, dest);
  }
};

exports.copyFolderSync = copyFolderSync;
