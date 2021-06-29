import crypto from 'crypto'
import express from 'express'
import { readFileSync } from 'fs'

const app = express()

const randomId = () => crypto.randomBytes(16).toString('hex')
const ID = randomId()

app.get('/', (req, res) => {
    const routes = app._router.stack
        .filter(layer => typeof layer.route != 'undefined' && layer.route)
        .map(layer => ({ path: layer.route.path, methods: Object.keys(layer.route.methods) }))
        .filter(route => route.path !== '/' && route.path !== '*')
        .sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
    const json = JSON.stringify(routes, null, 2)
    res.send(`<pre><code>${json}</code></pre>`)
})

app.get('/id', (req, res) => {
    const time = readFileSync('./time.txt', { encoding: 'utf-8' })
    res.json({ buildTime: time, fixed: ID, random: randomId() })
})

app.get('/heavy-work', (req, res) => {
    const hash = crypto.createHash('sha256')
    for (let i = 0; i < 500000; i++) hash.update(randomId())
    res.send(hash.digest('hex'))
})

app.get('/healthcheck', (req, res) => {
    res.send('OK')
})

app.get('*', (req, res) => {
    res.send('404')
})

app.listen(3000)
