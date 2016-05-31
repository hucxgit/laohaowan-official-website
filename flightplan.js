var plan = require("flightplan");

plan.target("staging", {
  host: "official.laohaowan.com",
  username: "ubuntu",
  agent: process.env.SSH_AUTH_SOCK
});

plan.target("deploy", {
  host: "www.laohaowan.cn",
  username: "ubuntu",
  agent: process.env.SSH_AUTH_SOCK
});

plan.remote(function(remote) {
  remote.log("Pull application from gitlab");
  remote.with("cd /data/repos/grief-official-website", function() {
    remote.exec("git pull");
    remote.with("cd /data/repos/grief-official-website/", function() {
      remote.exec("git pull");
      remote.exec("./dockerrun.sh");
    });
  });
});
