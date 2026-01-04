#!/bin/bash
cp  -r ./src/* ./stable-diffusion-infomation-panel-on-electron/src/renderer/src/
cd ./stable-diffusion-infomation-panel-on-electron
npm install
npm run build:linux
