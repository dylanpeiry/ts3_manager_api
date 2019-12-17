let express = require('express');
let router = express.Router();
const {TeamSpeak} = require('ts3-nodejs-library');

//Specify if the user is currently connected to the serverquery
let ts3 = null;
let response = {success: false, data: {}};

router.post('/auth/login', (req, res, next) => {
    TeamSpeak.connect({
        host: "dylanpeiry.ch",
        queryport: 10011,
        serverport: 9987,
        username: req.body.username,
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

});

router.post('/auth/logout', (req, res, next) => {
    ts3 = null;
    response.success = true;
    response.data.message = "Disconnected.";
    console.log(response);
    res.send(response);
});

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

router.get('/clients/ban', (req, res, next) => {
    res.send('GET Clients banned');
});

router.delete('/clients', (req, res, next) => {
    res.send('DELETE Clients');
});

router.post('/clients/ban', (req, res, next) => {
    res.send('POST Banned clients');
});

router.put('/clients/ban',(req, res, next) => {
    res.send('PUT Banned clients');
});

router.delete('/clients/ban',(req, res, next) => {
    res.send('DELETE Banned clients');
});

router.post('/server/start', (req, res) => {
    if (ts3 != null){
        ts3.serverStart(1).then(e => {
            console.log(e);
        }).catch(e => {
            console.log(e);
        });
    }

});

router.post('/server/stop', (req, res) => {
    if (ts3 != null){
        ts3.serverStop(1).then(e => {
            console.log(e);
        }).catch(e => {
            console.log(e);
        });
    }

});

module.exports = router;

