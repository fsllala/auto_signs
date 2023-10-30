const ikuunInstance = require("./ikunReq");

const ikuunLogin = (data) => {
  return ikuunInstance({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    url: "/auth/login",
    data,
  });
};
const ikuunLoginUser = () => {
  return ikuunInstance({
    method: "GET",
    url: "/user",
  });
};

const ikuunSignReq = () => {
  return ikuunInstance({
    method: "POST",
    url: "/user/checkin",
  });
};

module.exports = {
  ikuunLogin,
  ikuunLoginUser,
  ikuunSignReq,
};
