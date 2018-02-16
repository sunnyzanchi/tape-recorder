import format from 'date-fns/format';
import isThisYear from 'date-fns/is_this_year';
import prettyMs from 'pretty-ms';

export default {
  prettyTracks: state => state.tracks.map(track => ({
    ...track,
    date: format(
      track.date,
      isThisYear(track.date)
        ? 'MMM Do'
        : 'MMM Do YYYY',
    ),
    duration: prettyMs(track.duration),
  })),
};
