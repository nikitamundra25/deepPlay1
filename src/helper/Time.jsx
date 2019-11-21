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

export const SecondsToMMSSMM = (secs, type) => {
  var milliseconds = parseInt((secs % 1000) / 100),
    seconds = Math.floor((secs / 1000) % 60),
    minutes = Math.floor((secs / (1000 * 60)) % 60),
    minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  console.log("secssecssecs", milliseconds, secs);

  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
};
