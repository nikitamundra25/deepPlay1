const pad = num => {
  return ("0" + num).slice(-2);
};

export const SecondsToHHMMSS = secs => {
  var minutes = Math.floor(secs / 60);
  secs = secs % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

export const SecondsToMMSS = secs => {
  var minutes = Math.floor(secs / 60);
  secs = secs % 60;
  minutes = minutes % 60;
  return `${pad(minutes)}:${pad(secs)}`;
};

export const SecondsToMMSSMM = timeInSeconds => {
  var pad = function(num, size) {
      return ("00" + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(2, -1);
  return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 2)}`;
};
