const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 443; // this is the default https port

const domain = 'example.com'; //same domain you used in certbot

app.get('*', (req, res) => {
    res.send('hello from https');
});

const httpsServer = https.createServer(
    {
        key: fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${domain}/cert.pem`),
    },
    app
);

httpsServer.listen(port, () => {
    console.log(`yipee your https server is running on port ${port}`);
});
