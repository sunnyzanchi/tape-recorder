Tape Recorder
=============
Work in progress Web app for recording audio using the Web Audio and MediaStream Recording APIs. Built in Vue.

Build Setup
-----------
``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run all tests
yarn test
```

Goals
-----
+ Allow recording using device microphone, with looping option and playback range selection after recorded
+ Save locally to device or to Google Drive with Google Drive API
+ Offline functionality with ServiceWorker
+ Metronome
