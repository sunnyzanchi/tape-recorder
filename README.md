Tape Recorder
=============
Work in progress Web app for recording audio using the Web Audio and MediaStream Recording APIs. Built in Vue.

Build
-----
1. Make sure gulp is installed globally. `npm i -g gulp` or `yarn add -g gulp`
2. Run `yarn`
3. Run `gulp`
4. App is running on port 3000 and listening for changes


Goals
-----
+ Allow recording using device microphone, with looping option and playback range selection after recorded
+ Save locally to device or to Google Drive with Google Drive API
+ Offline functionality with ServiceWorker
+ Metronome
