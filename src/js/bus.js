// @flow
import Vue from 'vue';

const bus = new Vue;

// Events
const dbupdate = 'dbupdate';        // Whenever the DB updates
const trackupdate = 'trackupdate'   // Whenever a new track begins playing

export {bus, dbupdate, trackupdate};
