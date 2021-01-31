#!/bin/bash

if ! command -v node-gyp &> /dev/null; then
    echo installing node-gyp
    sudo npm i node-gyp -g
fi

[ -d node_modules ] || npm install
[ -d web/client/node_modules ] || npm install 

[ -f Build/Makefile ] || node-gyp configure
node-gyp build && npm test && echo [*] ALL TESTS PASSED && cd web/client && npm run build && cd .. && npm start 
