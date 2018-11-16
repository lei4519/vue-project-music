import { commonParams, options } from '@/api/config.js'
import jsonp from '@/common/js/jsonp.js'

export function getRankList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
  })
  return jsonp(url, data, options)
}

export function getRankInfo(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid:id,
    needNewCode:1,
    uin:0,
    tpl:3,
    page:'detail',
    type:'top',
    platform:'h5'
  })
  return jsonp(url, data, options)
}