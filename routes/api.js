let express = require('express');
let router = express.Router();
const {TeamSpeak} = require('ts3-nodejs-library');
//Specify if the user is currently connected to the serverquery
let ts3 = null;


router.post('/auth/login', ((req, res, next) => {
    let data = req.body;
    let login = data.login;
    let password = data.password;
    TeamSpeak.connect({
        host: "ts.s0kke.ch",
        queryport: 10011,
        serverport: 9987,
        username: login,
        password: password,
        nickname: "NodeJS"
    }).then(teamspeak => {
        ts3 = teamspeak;
        let response = {success: true, data: {message: "Connection successful."}};
        res.send(response);
    }).catch(e => {
        ts3 = null;
        let response = {success: false, data: e};
        res.send(response);
    })
}));

router.post('/auth/logout', ((req, res, next) => {
    ts3 = null;
    let response = {success: true, data: {message: 'Disconnected.'}};
    res.send(response);
}));

router.get('/clients', async (req, res, next) => {
    if (ts3 != null)
        res.send(await ts3.clientDBList());
    else
        res.send('No Connection');
});

router.post('/clients', ((req, res, next) => {
    res.send('POST Clients');
}));

module.exports = router;

