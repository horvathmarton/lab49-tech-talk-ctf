const { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, copyFileSync } = require('fs');
const { join } = require('path');
const { sync: rmdirSync } = require('rimraf');

/** Create the static folder. */
const staticDir = join(__dirname, '..', 'static');
if (existsSync(staticDir)) rmdirSync(staticDir);
mkdirSync(staticDir);

/** Setup the index page. */
const challengesFolder = join(__dirname, '..', 'challenges');
const templatesFolder = join(__dirname, '..', 'templates');
const indexPageTemplate = readFileSync(join(templatesFolder, 'index.html')).toString();
const links = readdirSync(challengesFolder)
    .map(folder => `<li><a href="/${folder}">${folder}</a></li>`).join('\n\t\t');
const indexPage = indexPageTemplate.replaceAll('{{ links }}', links);
writeFileSync(join(staticDir, 'index.html'), Buffer.from(indexPage));

/** Setup the crypto challenge. */
bundleCryptoChallenge('crypto', 'Crypto');

/** Setup the first demo challenge. */
bundleCryptoChallenge('demo-1', 'Demo 1');

/** Setup the osint challenge. */
bundleOsintChallenge('osint', 'OSINT');

/** Setup the reversing challenge. */
bundleReversingChallenge('reversing', 'Reverse engineering')


function bundleCryptoChallenge(folderName, title) {
    mkdirSync(join(staticDir, folderName));
    const folder = join(challengesFolder, folderName);
    const pageTemplate = readFileSync(join(templatesFolder, 'crypto.html')).toString();
    const description = readFileSync(join(folder, 'description.txt')).toString();
    const ciphertext = readFileSync(join(folder, 'ciphertext.txt')).toString();

    const page = pageTemplate
        .replaceAll('{{ title }}', title)
        .replaceAll('{{ description }}', description)
        .replaceAll('{{ ciphertext }}', ciphertext);
    writeFileSync(join(staticDir, folderName, 'index.html'), Buffer.from(page));
}

function bundleOsintChallenge(folderName, title) {
    mkdirSync(join(staticDir, folderName));
    const folder = join(challengesFolder, folderName);
    const pageTemplate = readFileSync(join(templatesFolder, 'osint.html')).toString();
    const description = readFileSync(join(folder, 'description.txt')).toString();

    const page = pageTemplate
        .replaceAll('{{ title }}', title)
        .replaceAll('{{ description }}', description);
    writeFileSync(join(staticDir, folderName, 'index.html'), Buffer.from(page));
}

function bundleReversingChallenge(folderName, title) {
    mkdirSync(join(staticDir, folderName));
    const folder = join(challengesFolder, folderName);
    const pageTemplate = readFileSync(join(templatesFolder, 'reversing.html')).toString();
    const description = readFileSync(join(folder, 'description.txt')).toString();

    const binaryOptions = [
        // { os: 'Windows', file: 'windows-binary' },
        { os: 'Mac', file: 'osx-binary' },
        // { os: 'Linux', file: 'unix-binary' },
    ]

    binaryOptions.forEach(({ file }) => copyFileSync(join(folder, file), join(staticDir, folderName, file)))
    const binaries = binaryOptions.map(({ os, file }) => `<li><a href=${file}>${os}</a></li>`)

    const page = pageTemplate
        .replaceAll('{{ title }}', title)
        .replaceAll('{{ description }}', description)
        .replaceAll('{{ binaries }}', binaries);
    writeFileSync(join(staticDir, folderName, 'index.html'), Buffer.from(page));
}