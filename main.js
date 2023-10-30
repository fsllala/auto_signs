const qs = require("qs");
const { PUSH_URL, PUSH_PLUS_TOKEN, USERNAME, PASSWORD } = require("./env");
const ikuunInstance = require("./plat/ikun/ikunReq");
const {
  ikuunSignReq,
  ikuunLogin,
  ikuunLoginUser,
} = require("./plat/ikun/ikun");

// 设置cookie
let iKUN_COOKIE = "";
async function setCookie(instance) {
  instance.defaults.headers.Cookie = iKUN_COOKIE;
}

// push
async function handlePush(desp) {
  const body = {
    token: `${PUSH_PLUS_TOKEN}`,
    title: `ikun签到`,
    content: `${desp}`,
  };
  const response = await ikuunInstance({
    url: PUSH_URL,
    method: "POST",
    data: body,
  });
  // console.log("pushResult", response.data);
}
async function ikuunSign() {
  try {
    const loginParams = qs.stringify({
      email: USERNAME,
      passwd: PASSWORD,
      code: "",
    });

    const loginResult = await ikuunLogin(loginParams);
    if (loginResult.status == 200) {
      const getCookie = loginResult.headers["set-cookie"];
      const getCk1 = getCookie[0].split("expires")[0];
      const getCk2 = getCookie[1].split("expires")[0];
      const getCk3 = getCookie[2].split("expires")[0];
      const getCk4 = getCookie[3].split("expires")[0];
      const getCk5 = getCookie[4].split("expires")[0];
      const headerCk =
        "lang=zh-cn; _gid=GA1.2.796883630.1698551596; _ga=GA1.2.809979368.1698551596; _gat_gtag_UA_158605448_1=1; _ga_8HVN7928SC=GS1.1.1698660707.3.1.1698662334.0.0.0;";

      iKUN_COOKIE = headerCk + getCk1 + getCk2 + getCk3 + getCk4 + getCk5;
      await setCookie(ikuunInstance);
      await ikuunLoginUser();

      const response = await ikuunSignReq();
      if (response.status == 200) {
        await handlePush(response.data.msg);
      }
    }
  } catch (error) {
    console.log("error", error);
    await handlePush(error);
  }
}

ikuunSign();
