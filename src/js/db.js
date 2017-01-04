// @flow
import Dexie from 'dexie';

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
export function addTrack({name, duration, data}): Promise<Object[]> {
  return db.tracks.add({
    name,
    duration,
    data
  });
}
