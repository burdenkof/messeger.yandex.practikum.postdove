const fallback = require('express-history-api-fallback')
const express = require('express')

const app = express()

const DIST_PATH = '/dist'
process.env.PORT = '3000'

app.use(express.static(`${__dirname}${DIST_PATH}`))
app.use(fallback(`${__dirname}/dist/index.html`))

app.listen(process.env.PORT, () => {
  console.log(`PostDove app listening on port ${process.env.PORT}!`)
})
