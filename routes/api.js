let express = require('express');
let router = express.Router();
const {TeamSpeak} = require('ts3-nodejs-library');

let authRouter = require('./auth');
//Specify if the user is currently connected to the serverquery
let ts3 = null;
let response = {success: false, data: {}};

router.post('/auth/login', ((req, res, next) => {
    TeamSpeak.connect({
        host: "ts.s0kke.ch",
        queryport: 10011,
        serverport: 9987,
        username: req.body.login,
        password: req.body.password,
        nickname: "NodeJS"
    }).then(teamspeak => {
        ts3 = teamspeak;
        response.success = true;
        response.data.message = "Connection successful.";
        res.send(response);
    }).catch(e => {
        ts3 = null;
        response.success = false;
        response.data = e;
        res.send(response);
    })

}));

router.post('/auth/logout', ((req, res, next) => {
    ts3 = null;
    response.success = true;
    response.data.message = "Disconnected.";
    res.send(response);
}));

router.get('/clients', async (req, res, next) => {
    if (ts3 != null) {
        response.success = true;
        response.data = await ts3.clientDBList();
        res.send(response);
    } else {
        response.success = false;
        response.data.message = "No connection.";
        res.send(response);
    }
});

router.post('/clients', ((req, res, next) => {
    res.send('POST Clients');
}));

module.exports = router;

