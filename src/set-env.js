const fs = require('fs');
const ngrok = require('ngrok');
const dotenv = require('dotenv');

const getPort = (url) => {
  url = (url.match(/^(([a-z]+:)?(\/\/)?[^\/]+).*$/) || ['', ''])[1] || url;
  var parts = url.split(':'),
    port = parseInt(parts[parts.length - 1], 10);
  if (parts[0] === 'http' && (isNaN(port) || parts.length < 3)) {
    return 80;
  }
  if (parts[0] === 'https' && (isNaN(port) || parts.length < 3)) {
    return 443;
  }
  return parts.length === 1 || isNaN(port) ? 80 : port;
};

const writeToFile = (envData) =>
  fs.writeFileSync(
    `${__dirname}/env/index.ts`,
    `export const {${Object.keys(envData).join(', ')}} = ${JSON.stringify(
      envData
    )};`
  );

const start = (file = `${__dirname}/.env`) => {
  const env = dotenv.parse(fs.readFileSync(file, 'utf-8'));
  const port = getPort(env.API_BASE);
  if (env.DEBUG.toLowerCase() === 'true' && port) {
    ngrok.connect(port).then((value) => {
      env.API_BASE = `${value}${env.API_BASE.split(`${port}`)[1]}`;
      writeToFile(env);
    });
  } else {
    writeToFile(env);
  }
};

module.exports = { start };
