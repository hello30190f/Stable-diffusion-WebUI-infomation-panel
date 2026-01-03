#!/bin/bash
cp  -r ./src/* ./stable-diffusion-infomation-panel-on-electron/src/renderer/src/
cd ./stable-diffusion-infomation-panel-on-electron
npm run build:linux
