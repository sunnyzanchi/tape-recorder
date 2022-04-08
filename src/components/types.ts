import { Track } from '../db'

export type TrackDisplay = Track & {
  playing: boolean
}
