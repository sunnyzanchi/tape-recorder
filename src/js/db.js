// @flow
import Dexie from 'dexie';
import {bus} from './bus.js';

// Create the db if it doesn't exist and connect to it
const db = new Dexie('Audio');
db.version(1).stores({
  tracks: '++id, name, duration, data'
});
db.open().catch(err=>console.log(err));

/* Gets a list of all saved tracks */
export function getAllTracks(): Promise<Object[]> {
  return db.tracks.toArray();
}

/* Adds a new track to the DB */
export function addTrack({name, duration, data}: trackInfo): Promise<Object[]> {
  var add = db.tracks.add({
    name,
    duration,
    data
  });
  add.then(function(){
    bus.$emit('dbupdate');
  })
  return add;
}

/* Removes track from the DB */
export function removeTrack(pk: Number): Promise<Object[]> {
  return db.tracks.delete(pk);
}

type trackInfo = {
  name: String,
  duration: Number,
  data: Blob
}
