// @flow
import Vue from 'vue';

const bus = new Vue;

// Events
const deletecancel = 'deletecancel';  // Whenever the user cancels a delete
const dbupdate = 'dbupdate';          // Whenever the DB updates
const dialogcancel = 'dialogcancel';  // Whenever a dialog box is cancelled
const dialogsubmit = 'dialogsubmit';  // Whenever a dialog box is confirmed
const dialogupdate = 'dialogupdate';  // Whenever a dialog box needs to open
const trackdelete = 'trackdelete';    // Whenever a track is deleted
const trackupdate = 'trackupdate';    // Whenever a new track begins playing

export {bus, deletecancel, dbupdate, dialogsubmit, dialogupdate, trackdelete, trackupdate};
