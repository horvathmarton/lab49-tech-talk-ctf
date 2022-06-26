const {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  copyFileSync,
} = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");
const { sync: rmdirSync } = require("rimraf");
const { copyFolderSync } = require("./utils");

const { SCOREBOARD_URL } = process.env;

if (!SCOREBOARD_URL) throw new Error("SCOREBOARD_URL is not defined.");

const staticDir = join(__dirname, "..", "static");
const challengesFolder = join(__dirname, "..", "challenges");
const templatesFolder = join(__dirname, "..", "templates");

function bundleCryptoChallenge(folderName, title) {
  mkdirSync(join(staticDir, folderName));
  const folder = join(challengesFolder, folderName);
  const pageTemplate = readFileSync(
    join(templatesFolder, "crypto.html")
  ).toString();
  const description = readFileSync(join(folder, "description.txt")).toString();
  const ciphertext = readFileSync(join(folder, "ciphertext.txt")).toString();

  const page = pageTemplate
    .replaceAll("{{ title }}", title)
    .replaceAll("{{ description }}", description)
    .replaceAll("{{ ciphertext }}", ciphertext);
  writeFileSync(join(staticDir, folderName, "index.html"), Buffer.from(page));
}

function bundleOsintChallenge(folderName, title) {
  mkdirSync(join(staticDir, folderName));
  const folder = join(challengesFolder, folderName);
  const pageTemplate = readFileSync(
    join(templatesFolder, "osint.html")
  ).toString();
  const description = readFileSync(join(folder, "description.txt")).toString();

  const page = pageTemplate
    .replaceAll("{{ title }}", title)
    .replaceAll("{{ description }}", description);
  writeFileSync(join(staticDir, folderName, "index.html"), Buffer.from(page));
}

function bundleReversingChallenge(folderName, title) {
  mkdirSync(join(staticDir, folderName));
  const folder = join(challengesFolder, folderName);
  const pageTemplate = readFileSync(
    join(templatesFolder, "reversing.html")
  ).toString();
  const description = readFileSync(join(folder, "description.txt")).toString();

  const binaryOptions = [
    // { os: 'Windows', file: 'windows-binary' },
    { os: "Windows", file: "osx-binary" },
    { os: "Mac", file: "osx-binary" },
    { os: "Linux", file: "osx-binary" },
    // { os: 'Linux', file: 'unix-binary' },
  ];

  binaryOptions.forEach(({ file }) =>
    copyFileSync(join(folder, file), join(staticDir, folderName, file))
  );
  const binaries = binaryOptions
    .map(
      ({ os, file }) =>
        `<li class="flex items-center"><a href=${file} class="no-underline hover:bg-secondary hover:text-neutral">${os}</a></li>`
    )
    .join("\n\t\t");

  const page = pageTemplate
    .replaceAll("{{ title }}", title)
    .replaceAll("{{ description }}", description)
    .replaceAll("{{ binaries }}", binaries);
  writeFileSync(join(staticDir, folderName, "index.html"), Buffer.from(page));
}

function bundleStaticWebChallenge(folderName, title) {
  const folder = join(challengesFolder, folderName, "app");
  const description = readFileSync(
    join(folder, "..", "description.txt")
  ).toString();

  copyFolderSync(folder, join(staticDir, folderName));

  const indexFileTemplate = readFileSync(join(folder, "index.html")).toString();
  const indexFile = indexFileTemplate
    .replaceAll("{{ title }}", title)
    .replaceAll("{{ description }}", description);
  writeFileSync(join(staticDir, folderName, "index.html"), indexFile);
}

function bundleSpaWebChallenge(folderName, title) {
  const appFolder = join(challengesFolder, folderName, "app");

  execSync(`PUBLIC_URL=/${folderName} npm run bundle`, {
    cwd: appFolder,
  });

  copyFolderSync(join(appFolder, "build"), join(staticDir, folderName));
}

function main() {
  /** Create the static folder. */
  if (existsSync(staticDir)) rmdirSync(staticDir);
  mkdirSync(staticDir);

  /** Setup the index page. */
  const indexPageTemplate = readFileSync(
    join(templatesFolder, "index.html")
  ).toString();
  const links = readdirSync(challengesFolder)
    .map(
      (folder) =>
        `<li class="flex items-center"><a href="/${folder}" class="no-underline hover:bg-secondary hover:text-neutral">${folder}</a></li>`
    )
    .join("\n\t\t");
  const indexPage = indexPageTemplate
    .replaceAll("{{ scoreboardUrl }}", SCOREBOARD_URL)
    .replaceAll("{{ links }}", links);
  writeFileSync(join(staticDir, "index.html"), Buffer.from(indexPage));

  /** Copy stylesheet. */
  copyFileSync(
    join(__dirname, "..", "styles/tailwind.css"),
    join(staticDir, "tailwind.css")
  );

  /** Setup the crypto challenge. */
  bundleCryptoChallenge("crypto", "Crypto");

  /** Setup the first demo challenge. */
  bundleCryptoChallenge("demo-1", "Demo 1");

  /** Setup the second demo challenge. */
  bundleStaticWebChallenge("demo-2", "Demo 2");

  /** Setup the osint challenge. */
  bundleOsintChallenge("osint", "OSINT");

  /** Setup the reversing challenge. */
  bundleReversingChallenge("reversing", "Reverse engineering");

  /** Setup the first web challenge. */
  bundleSpaWebChallenge("web-1", "Web one");

  /** Setup the second web challenge. */
  bundleStaticWebChallenge("web-2", "Web two");
}

main();
