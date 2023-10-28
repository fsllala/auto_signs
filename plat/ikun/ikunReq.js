const axios = require("axios");
const ikuunInstance = axios.create({
  baseURL: "https://ikuuu.me",
  headers: {
    accept: "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    pragma: "no-cache",
    "sec-ch-ua":
      '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    Referer: "https://ikuuu.me/user",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

module.exports = ikuunInstance;
