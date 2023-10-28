const { PUSH_URL, PUSH_PLUS_TOKEN, iKUN_COOKIE } = require("./env");
const ikuunInstance = require("./plat/ikun/ikunReq");
const { ikuunSignReq } = require("./plat/ikun/ikun");

// 设置cookie
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
  console.log("pushResult", response.data);
}
async function ikuunSign() {
  try {
    await setCookie(ikuunInstance);
    const response = await ikuunSignReq();
    if (response.status == 200) {
      await handlePush(response.data.msg);
    }
  } catch (error) {
    console.log("error", error);
    await handlePush(error);
  }
}

ikuunSign();
