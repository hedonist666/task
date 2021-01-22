#!/bin/bash

if ! command -v node-gyp &> /dev/null; then
    echo installing node-gyp
    sudo npm i node-gyp -g
fi

[ -f Build/Makefile ] || node-gyp configure
node-gyp build && node --napi-modules ./web/host.js