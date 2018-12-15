const express = require('express')
const axios = require("axios");
const app = express()

const appRoutes = express.Router()
appRoutes
  .get('/getDiscList', (req, res) => {
    'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const url =
      'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        res.json(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  })
  .get('/getDiscInfo', (req, res) => {
    const url =
      'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        res.json(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  })
  .get('/getSearchList', (req, res) => {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        res.json(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  })
  .get('/getPlayUrl', (req, res) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios
      .get(url, {params: req.query})
      .then(response => {
        res.json(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  })
  .get('/getLyric', (req, res) => {
    const url =
      'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios
      .get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(response => {
        let ret = response.data
        if (typeof ret === 'string') {
          let reg = /^\w+\(({[^()]+})\)$/
          let matches = ret.match(reg)
          if (matches) {
            ret = JSON.parse(matches[1])
          }
        }
        res.json(ret)
      })
      .catch(e => {
        console.log(e)
      })
  })
// 开启gzip压缩,如果你想关闭gzip,注释掉下面两行代码，重新执行`node server.js`
var compression = require('compression')
app.use(compression())
app.use('/', appRoutes)
app.use(express.static('./dist'))

module.exports = app.listen(3000, (err) => {
  if (err) console.log(err)
  console.log('Listening at http://localhost:3000')
})
