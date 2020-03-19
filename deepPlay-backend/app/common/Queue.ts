import queue from "queue";

const JobQueue = queue({
  autostart: true
});

JobQueue.on("success", result => {
  if (result) {
    console.log(result);
    return;
  }
  console.log("1 Process completed from JobQueue");
});

JobQueue.on("end", err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("JobQueue Is Empty Now");
});

export default JobQueue;
