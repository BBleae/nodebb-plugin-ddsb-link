'use strict'

const cacheKey = 'ddsblink.cache:'

const db = require.main.require('./src/database')
const nconf = require.main.require('nconf')
const axios = require('axios')
const URL = require.main.require('url')

const Core = {}

Core.parse = async data => {
  const reg = /<a href="((?:[hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])"(.*)>(.+)<\/a>/g
  let match = reg.exec(data.postData.content)
  while (match !== null) {
    data.postData.content = data.postData.content.replace(match[0], '<a href="' + await Core.ddsbUrl(match[1]) + '"' + match[2] + '>' + match[3] + '</a>')
    match = reg.exec(data.postData.content)
  }
  return data
}

Core.ddsbUrl = async url => {
  if (URL.parse(nconf.get('url')).hostname === URL.parse(url).hostname) {
    return url
  }
  const cache = await db.getObjectField(cacheKey + url, 'value')
  if (typeof cache === 'string' && cache.length > 0) {
    return cache
  }
  const res = Core.parseJson((await axios.get('https://dd.sb/api.php?url=' + url)).data)
  if (parseInt(res.error) === 0) {
    Core.addCache(url, res.shorturl)
    return res.shorturl
  }
  return url
}

Core.addCache = async (longurl, shorturl) => {
  db.setObjectField(cacheKey + longurl, 'value', shorturl)
}

Core.parseJson = str => {
  str = str[0] === '\uFEFF' ? str.substr(1) : str
  return JSON.parse(str)
}

module.exports = Core
module.exports.Core = Core
