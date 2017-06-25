'use strict'

var cp = require('child_process')
var path = require('path')

var uiRoot = path.resolve(__dirname, 'packages', 'ui')

cp.execSync('rm -f yarn.lock', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('NODE_ENV=development yarn --ignore-optional', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('yarn run build', { cwd: uiRoot, stdio: 'inherit' })
cp.execSync('docker build . -t dino-dna/truth.lol', { stdio: 'inherit' })
