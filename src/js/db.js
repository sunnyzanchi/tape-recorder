// @flow
import Dexie from 'dexie';
import {bus, dbupdate} from './bus.js';

// Create the db if it doesn't exist and connect to it
const db = new Dexie('Audio');
db.version(1).stores({
  tracks: '++id, name, duration, data, date'
});
db.open().catch(err=>console.log(err));

/* Gets a list of all saved tracks */
export function getAllTracks(): Promise<Object[]> {
  return db.tracks.reverse().toArray();
}

/* Adds a new track to the DB */
export function addTrack({name, duration, data, date}: trackInfo): Promise<Object[]> {
  var add = db.tracks.add({
    name,
    duration,
    data,
    date: new Date
  });
  add.then(function(){
    bus.$emit(dbupdate);
  });
  return add;
}

/* Gets one specific track */
export function getTrack(id: Number): Promise<Object>{
  var track = db.tracks
                 .where('id')
                 .equals(id)
                 .toArray(array => array[0]);
  return track;
}

/* Removes track from the DB */
export function removeTrack(id: Number): Promise<Object[]> {
  var remove = db.tracks.delete(id);
  remove.then(function(){
    bus.$emit(dbupdate);
  });
  return remove;
}

type trackInfo = {
  name: String,
  duration: Number,
  data: Blob,
  date: Date
}
