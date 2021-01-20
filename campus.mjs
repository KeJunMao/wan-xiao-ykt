import { createRSAKeyPair } from "./utils/rsaEncrypt.mjs";
import randInt from "./utils/randInt.mjs";
import { des3Encrypt } from "./utils/des3.mjs";
import { sha256 } from "./utils/sha1.mjs";
import fetch from "node-fetch";

export default class CampusCard {
  constructor(phone, password) {
    this.phone = phone;
    this.password = password;
    this.__rsa = createRSAKeyPair(1024);
    this.userInfo = this.createBlankUser();
  }
  createBlankUser() {
    return {
      key: "",
      session: "",
      exchangeFlag: true,
      login: false,
      serverPublicKey: "",
      deviceId: String(randInt(999999999999999, 9999999999999999)),
      wanxiaoVersion: 10462101,
      rsaKey: {
        private: this.__rsa.privateKey,
        public: this.__rsa.publicKey,
      },
    };
  }
  async exchangeSecret() {
    let sessionInfo = {};
    try {
      const res = await fetch(
        "https://server.17wanxiao.com/campus/cam_iface46/exchangeSecretkey.action",
        {
          method: "post",
          headers: {
            "User-Agent":
              "Dalvik/2.1.0 (Linux; U; Android 5.1.1; HUAWEI MLA-AL10 Build/HUAWEIMLA-AL10)",
          },
          body: JSON.stringify({
            key: this.userInfo.rsaKey.public,
          }),
          timeout: 3000,
        }
      );
      const body = await res.text();
      sessionInfo = JSON.parse(this.__rsa.decrypt(body));
    } catch (error) {
      console.log(error);
      return false;
    }
    this.userInfo = Object.assign(sessionInfo);
    return true;
  }
  async login() {
    const passwordArray = this.password
      .split("")
      .map((v) => des3Encrypt(v, this.userInfo.key));
    const loginBody = {
      appCode: "M002",
      deviceId: this.userInfo.deviceId,
      netWork: "wifi",
      password: passwordArray,
      qudao: "guanwang",
      requestMethod: "cam_iface46/loginnew.action",
      shebeixinghao: "MLA-AL10",
      systemType: "android",
      telephoneInfo: "5.1.1",
      telephoneModel: "HUAWEI MLA-AL10",
      type: "1",
      userName: this.phone,
      wanxiaoVersion: 10462101,
      yunyingshang: "07",
    };
    const body = {
      session: this.userInfo.session,
      data: des3Encrypt(JSON.stringify(loginBody), this.userInfo.key),
    };
    try {
      const res = await fetch(
        "https://server.17wanxiao.com/campus/cam_iface46/loginnew.action",
        {
          method: "post",
          headers: {
            campusSign: sha256(JSON.stringify(body)),
          },
          body: JSON.stringify(body),
          timeout: 30000,
        }
      );
      const jsonData = await res.json();
      if (jsonData.result_) {
        this.userInfo.login = true;
        this.userInfo.exchangeFlag = true;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // 获取交易记录
  async getTradeDetail(beginDate, endDate) {
    const param = {
      beginDate,
      endDate,
      beginIndex: 0,
      count: 99999,
    };
    const body = {
      token: this.userInfo.session,
      method: "XYK_TRADE_DETAIL",
      param: JSON.stringify(param),
    };
    const rawArray = Object.keys(body).map((key) => {
      const val = encodeURIComponent(body[key]);
      return `${key}=${val}`;
    });
    const raw = rawArray.join("&");
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: raw,
      redirect: "follow",
    };
    const res = await fetch(
      "https://server.59wanmei.com/YKT_Interface/xyk",
      requestOptions
    );
    const jsonData = await res.json();
    if (!jsonData.result_) return false;
    return JSON.parse(decodeURI(jsonData.body));
  }
}
