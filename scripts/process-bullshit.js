var cheerio = require('cheerio')
var fs = require('fs-extra')
var path = require('path')
var uniq = require('lodash/uniq')

var RULING_TYPES = [
  'false',
  'pants-fire',
  'half-true',
  'barely-true',
  'mostly-true',
  'true',
  'full-flop'
]

var BULLSHIT_RULING_TYPES = [
  'false',
  'pants-fire',
  'full-flop',
  // 'half-true',
  'barely-true'
]

void async function go () {
  var res = require('../bullshit-unprocessed.json')
  res = res
    .map(r => {
      r.statement = cheerio(r.statement).text()
      return {
        text: r.statement.trim(),
        reference_url: `http://www.politifact.com${r.statement_url}`,
        date: r.statement_date,
        ruling: r.ruling.ruling_slug
      }
    })
    .filter(r => BULLSHIT_RULING_TYPES.indexOf(r.ruling) >= 0)
  console.log(`${res.length} pieces of bullshit rendered`)
  // all ruling types
  // console.log(uniq(res.map(r => r.ruling)))
  await fs.writeFile(path.resolve(__dirname, '../packages/api/bullshit.json'), JSON.stringify(res, null, 2))
}()
