'use strict'

var cp = require('child_process')
var path = require('path')

var uiRoot = path.resolve(__dirname, 'packages', 'ui')

cp.execSync('rm -rf node_modules', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('NODE_ENV=development npm install', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('npm run build', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('docker build . -t dino-dna/truth.lol', { stdio: 'inherit' })
