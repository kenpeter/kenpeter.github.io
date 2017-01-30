// path
var path = require('path');

// fs
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637

// basically, sym link not working, so get full path
// app dir, which is my_react_resume
// fs real path sync
// process cwd
var appDirectory = fs.realpathSync(process.cwd());

// func resolve app
// relateive path
function resolveApp(relativePath) {
  // path
  // resolve
  // this app dir
  // whatever module path
  return path.resolve(appDirectory, relativePath);
}


// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

// NODE_PATH is where node module located
var nodePaths = (process.env.NODE_PATH || '') // []
  // split array
  // process
  // platform
  // === For instance 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  .split(process.platform === 'win32' ? ';' : ':') // ['']
  // Boolean is like a func, pass to filter
  .filter(Boolean) // []
  .map(resolveApp); // []

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'), // build dir
  appPublic: resolveApp('public'), // public dir
  appHtml: resolveApp('public/index.html'), // that is source
  appIndexJs: resolveApp('src/index.js'), // index
  
  appPackageJson: resolveApp('package.json'), // pack json
  appSrc: resolveApp('src'), // src
  testsSetup: resolveApp('src/setupTests.js'), // test
  appNodeModules: resolveApp('node_modules'), // node module dir
  
  ownNodeModules: resolveApp('node_modules'), // another node module dir
  nodePaths: nodePaths
};  
  
