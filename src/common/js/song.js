import axios from "axios";
import { commonParams, options } from "@/api/config";
import { getLyric } from "@/api/song";
import { Base64 } from "js-base64";

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  async setLyric() {
    if (this.lyric) return this.lyric;
    let { data: ret } = await getLyric(this.mid);
    this.lyric = Base64.decode(ret.lyric);
  }
}
function creataSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`
  });
}

export function filterSinger(singer) {
  let ret = [];
  if (!singer) {
    return "";
  }
  singer.forEach(s => ret.push(s.name));
  return ret.join("/");
}
export function* creataSongs(musicList) {
  const ret = musicList.map(s => creataSong(s));
  yield ret;
  getUrl(musicList).then(({ domain, playUrlList }) => {
    ret.forEach((s, i) => (s.url = `${domain}${playUrlList[i].purl}`));
  });
}
export async function anSong(song) {
  const s = creataSong(song);
  const { url_mid: res } = await getPlayUrl({
    songmids: [song.songmid],
    songtype: [song.type]
  });
  const domain = res.data.sip[0];
  const playUrlList = res.data.midurlinfo[0];
  s.url = `${domain}${playUrlList.purl}`;
  return Promise.resolve(s);
}
async function getUrl(list) {
  let songmids = [];
  let songtype = [];
  list.forEach(s => {
    songmids.push(s.songmid);
    songtype.push(s.type);
  });
  const { url_mid: res } = await getPlayUrl({ songmids, songtype });
  const domain = res.data.sip[0];
  const playUrlList = res.data.midurlinfo;
  return { domain, playUrlList };
}

export async function getPlayUrl({ songmids, songtype = 0 }) {
  const url = "/getPlayUrl";
  const urlData = {
    url_mid: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        guid: "9768452544",
        songmid: songmids,
        songtype: songtype,
        uin: "0",
        loginflag: 1,
        platform: "20"
      }
    },
    comm: { uin: 0, format: "json", ct: 20, cv: 0 }
  };
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    platform: "yqq",
    format: "json",
    needNewCode: 0,
    data: JSON.stringify(urlData)
  });
  const res = await axios.get(url, {
    params: data
  });
  return res.data;
}
