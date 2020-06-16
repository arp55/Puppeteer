const express = require('express')
const app = express()
const port = 3000
var path = require('path');
app.use(express.json())
const scrapers = require('./scrapers')
const { Creator } = require('./creator')
require('./db');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/creators', async (req, res) => {
    const creators = await Creator.findAll().catch(err => console.log(err));
    res.status(200).send({ creators });
})

app.post('/creators', async (req, res) => {
    let { channelUrl } = req.body;
    const channelData = await scrapers.scrapeWebsite(req.body.channelUrl)
    console.log({ channelData })
    let { name, avatarUrl } = channelData;
    const creator = await Creator.create({
        name,
        avatar: avatarUrl,
        channelUrl
    }).catch(err => console.log(err))
    console.log(creator)
    res.send(creator);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))    