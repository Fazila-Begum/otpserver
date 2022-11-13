const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer')()
const fs = require("fs");
const { runInNewContext } = require('vm');

const otpModule = require('./OTPModule.js');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/genOtp', function (req, res) {
    let otpRecord = otpModule.generateOTP();
    res.contentType('json');
    res.send(otpRecord);
 })
 
app.post('/verifyotp',function(req, res){
    const payLoad = req.body;
    const identifier = payLoad.identifier;
    const mfaCode = payLoad.mfaCode;
    const isValid = otpModule.isValidOTP(identifier,mfaCode);
    res.send(isValid);
});

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    var crypto = require('crypto');
    const sessionid = crypto.randomBytes(16).toString('base64');
    console.log("Example app listening at http://%s:%s with session id %s", host, port,sessionid);
 })

 