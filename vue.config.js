let glob = require('glob')

function getEntry (globPath) {
  let entries = {}
  glob.sync(globPath).forEach(entry => {
    var tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
      filename: tmp[1]
    }
  })
  return entries
}

let pages = getEntry('./src/pages/**?/*.html')

console.log(pages)

module.exports = {
  pages,
  devServer: {
    before: app => {
      app.get('/', (req, res, next) => {
        res.write('<head><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>')
        for (let i in pages) {
          res.write(`<a target="_self" href="/${i}">/${i}</a></br>`)
        }
        res.end()
      })
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
