import jsonp from "@/common/js/jsonp";
import { commonParams, options } from "./config";
import axios from "axios";

export function getHotKey() {
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";

  const data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

export async function getSearchList(
  query,
  page = 1,
  zhida = true,
  perpage = 20
) {
  let url = "/getSearchList";
  const data = Object.assign({}, commonParams, {
    platform: "h5",
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    format: "json",
    flag: 1,
    ie: "utf-8",
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: "txt.mqq.all"
  });
  return await axios.get(url, { params: data });
}
