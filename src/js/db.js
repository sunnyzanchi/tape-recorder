import Dexie from 'dexie';

const db = new Dexie('Audio');
db.version(1).stores({
  tracks: '++id, name, duration, data, date',
});

db.open().catch(err => console.log(err));

export const getTracks = () =>
  db.tracks.reverse().toArray();

export const addTrack = trackInfo =>
  db.tracks.add({
    ...trackInfo,
    date: new Date(),
  });
