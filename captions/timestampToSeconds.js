function timestampToSeconds(srtTimestamp) {
  const [rest, millisecondsString] = srtTimestamp.split(',');
  const milliseconds = parseInt(millisecondsString);
  const [hours, minutes, seconds] = rest.split(':').map((x) => parseInt(x));
  return milliseconds * 0.001 + seconds + 60 * minutes + 3600 * hours;
}

module.exports = timestampToSeconds;
