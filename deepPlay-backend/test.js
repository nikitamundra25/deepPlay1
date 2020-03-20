const queue = require("queue")
const http = require("http")
const JobQueue = queue({
  autostart: true
});

JobQueue.on("success", (result, job) => {
  console.log('job finished processing:', job)
});

JobQueue.on("end", err => {
  if (err) {
    console.log(err);
  }
  console.log("JobQueue is empty")
});
/**
 * Process video trimming
 */
const processVideoTrmiming = async () => {
  console.log("asdfasfas");
  JobQueue.push(function (cb) {
    setTimeout(function () {
      console.log("Job finihsed after 20000");
      cb();
    }, 20000);
  });
};
processVideoTrmiming();
const pushAnotherJob = () => {
  JobQueue.push(function (cb) {
    console.log("This is called after 2000 one is completed.")
    cb()
  })
  setTimeout(() => {
    JobQueue.push(function (callback) {
      console.log("Triggered automatically.")
      callback()
    })
  }, 5000)
}
const serve = http.createServer()
serve.listen(3000, () => {
  JobQueue.push(function (cb) {
    setTimeout(function () {
      console.log("Job finihsed after 2000");
      cb();
      pushAnotherJob();
    }, 2000);
  })
})