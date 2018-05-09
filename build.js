var cp = require('child_process')
var path = require('path')

var uiRoot = path.resolve(__dirname, 'packages', 'ui')
var apiRoot = path.resolve(__dirname, 'packages', 'api')
var uiBuildRoot = path.resolve(uiRoot, 'build')
var apiPublicRoot = path.resolve(apiRoot, 'public')
var projectRoot = __dirname

// WAT build runs out of mem on the droplet.
cp.execSync('node scripts/process-bullshit.js', { cwd: projectRoot, stdio: 'inherit' })
cp.execSync('yarn run build', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync(`rm -rf ${apiPublicRoot}/*`, { stdio: 'inherit' })
cp.execSync(`cp -r ${uiBuildRoot}/* ${apiPublicRoot}/`, { stdio: 'inherit' })
cp.execSync('docker build . -t dino-dna/truth.lol', { stdio: 'inherit', cwd: apiRoot })
