import Dexie, { Table } from 'dexie'

export type Track = {
  audio: Blob
  created: Date
  duration: number
  id: string
  name: string
}

class RecDb extends Dexie {
  tracks!: Table<Track>

  async addTrack(track: Track) {
    return db.tracks.add(track)
  }

  async deleteAll() {
    const tracks = await this.tracks.toArray()
    tracks.forEach((t) => this.tracks.where('id').equals(t.id).delete())
  }

  async getTracks() {
    const tracks = await db.tracks.toArray()
    return new Map(tracks.map((track) => [track.id, track]))
  }
}

const db = new RecDb('REC_DB')

db.version(1).stores({
  tracks: 'created, duration, &id, name',
})

export default db
