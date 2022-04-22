import { UserInfo } from "../types/UserInfo";

const useragent = require("useragent");
const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");

export default function getUserInfo(req: any): UserInfo {
  let parser = new UAParser();
  parser.setUA(req.headers["user-agent"]);
  var agent = useragent.parse(req.headers["user-agent"]);

  let result: UserInfo = {
    browser: agent.family.toLowerCase(),
    os: parser.getOS().name.toLowerCase(),
  };
  return result;
}
