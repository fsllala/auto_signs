const ikuunInstance = require("./ikunReq");

const ikuunSignReq = () => {
  return ikuunInstance({
    method: "POST",
    url: "/user/checkin",
  });
};

module.exports={
  ikuunSignReq
}
