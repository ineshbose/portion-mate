// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');

const crypto = require('crypto');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');
const setEnv = require('./set-env');

module.exports = async () => {
  await setEnv.start();
  // Find the workspace root, this can be replaced with `find-yarn-workspace-root`
  const workspaceRoot = path.resolve(__dirname, '..');
  const projectRoot = __dirname;

  const config = getDefaultConfig(projectRoot);

  // Watch all files within the monorepo
  config.watchFolders = [workspaceRoot];
  // Let Metro know where to resolve packages, and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ];

  // Reread env file
  let hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(path.resolve(projectRoot, '.env')));
  config.cacheVersion = hash.digest('hex');
  config.resetCache = true;

  return config;
};
