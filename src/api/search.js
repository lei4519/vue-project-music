import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export async function getSearchList(str, p = 1) {
  let url = '/getSearchList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: str,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    format: 'json',
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: p,
    remoteplace: 'txt.mqq.all'
  })
  return await axios.get(url, {
    params: data
  })
}
