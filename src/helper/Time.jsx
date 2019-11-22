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

export const SecondsToMMSSMM = milliseconds => {
  var seconds = Math.floor(milliseconds / 1000) % 60,
    minutes = Math.floor((milliseconds - seconds) / 1000 / 60);
  console.log("time", minutes, seconds, milliseconds);
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
};
