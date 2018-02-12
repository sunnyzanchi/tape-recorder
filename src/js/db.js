import Dexie from 'dexie';

const db = new Dexie('Audio');
db.version(1).stores({
  tracks: '++id, name, duration, data, date',
});

db.open().catch(err => console.log(err));
