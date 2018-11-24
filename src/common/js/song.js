import axios from 'axios'
import {commonParams, options} from '@/api/config'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
function creataSong (musicData, url) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url
  })
}
export async function creataSongs(musicList) {
  const ret = []
  const {domain, playUrlList} = await getUrl(musicList)
  musicList.forEach((s, i) => {
    ret.push(creataSong(s.musicData, `${domain}${playUrlList[i].purl}`))
  })
  return ret
}
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => ret.push(s.name))
  return ret.join('/')
}
async function getUrl(list) {
  let songmids = []
  let songtype = []
  list.forEach(s => {
    let song = s.musicData
    songmids.push(song.songmid)
    songtype.push(song.type)
  })
  const {url_mid: res} = await getPlayUrl({songmids, songtype})
  const domain = res.data.sip[0]
  const playUrlList = res.data.midurlinfo
  return {domain, playUrlList}
}

async function getPlayUrl({songmids, songtype}) {
  const url = '/getPlayUrl'
  const urlData = {
    'url_mid': {
      'module': 'vkey.GetVkeyServer',
      'method': 'CgiGetVkey',
      'param': {
        'guid': '9768452544',
        'songmid': songmids,
        'songtype': songtype,
        'uin': '0',
        'loginflag': 1,
        'platform': '20'
      }
    },
    'comm': {'uin': 0, 'format': 'json', 'ct': 20, 'cv': 0}
  }
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    format: 'json',
    needNewCode: 0,
    data: JSON.stringify(urlData)
  })
  const res = await axios.get(url, {
    params: data
  })
  return res.data
}
