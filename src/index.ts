import 'dotenv/config'
import { CommonClient } from "tencentcloud-sdk-nodejs-common";
// const CommonClient = TencentCloudCommon.CommonClient

const clientConfig = {
  credential: {
    secretId: process.env.SECRET_ID,
    secretKey: process.env.SECRET_KEY,
  },
  region: "ap-shanghai",
  profile: {
    httpProfile: {
      endpoint: "tmt.tencentcloudapi.com",
    },
  },
};

const client = new CommonClient(
  "tmt.tencentcloudapi.com",
  "2018-03-21",
  clientConfig
);
const params = {
    "SourceText": "数据未激活，请联系51管理员",
    "Source": "zh",
    "Target": "en",
    "ProjectId": 0
};
client.request("TextTranslate", params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);