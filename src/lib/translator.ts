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



export async function translate(text: string) {
  const params = {
    "SourceText": text,
    "Source": "zh",
    "Target": "en",
    "ProjectId": 0
  };
  return client.request("TextTranslate", params).then(
    async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return data.TargetText;
    },
    (err) => {
      console.error("error", err);
    }
  );
}
