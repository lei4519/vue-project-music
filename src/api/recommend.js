import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export async function getDiscList() {
  let url = '/getDiscList'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq',
    rnd: Math.random(),
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })
  return await axios.get(url, {
    params: data
  })
}

export async function getCDInfo(disstid = 0) {
  let url = '/getCDInfo'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  })
  return await axios.get(url, {
    params: data
  })
}
