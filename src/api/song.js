import {commonParams} from '@/api/config.js'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/getLyric'
  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  })
}
