// @flow
import Vue from 'vue';

const bus = new Vue;

// Events
const dbupdate = 'dbupdate';          // Whenever the DB updates
const dialogcancel = 'dialogcancel';  // Whenever a dialog box is cancelled
const dialogsubmit = 'dialogsubmit';  // Whenever a dialog box is confirmed
const dialogupdate = 'dialogupdate';  // Whenever a dialog box needs to open
const trackupdate = 'trackupdate';    // Whenever a new track begins playing

export {bus, dbupdate, dialogsubmit, dialogupdate, trackupdate};
