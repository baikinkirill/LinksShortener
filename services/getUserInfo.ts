import { UserInfo } from '../types/UserInfo'

const useragent = require('useragent')
const UAParser = require('ua-parser-js')

export default function getUserInfo (req: any): UserInfo {
  const parser = new UAParser()
  parser.setUA(req.headers['user-agent'])
  const agent = useragent.parse(req.headers['user-agent'])

  const result: UserInfo = {
    browser: agent.family.toLowerCase(),
    os: (parser.getOS().name || '¯\\_(ツ)_/¯').toLowerCase()
  }
  return result
}
