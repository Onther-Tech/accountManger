var keythereum = require('keythereum');
var fs = require("fs");
var join = require("path").join;
var crypto = require("crypto");
var assert = require("chai").assert;
var geth = require("geth");
var checkKeyObj = require("./checkKeyObj.js");

var NUM_TESTS = 1000;
var TIMEOUT = 10000;
var DATADIR = join(__dirname, "fixtures");

var options = {
  persist: false,
  flags: {
    networkid: "10101",
    port: 30304,
    rpcport: 8547,
    nodiscover: null,
    datadir: DATADIR,
    ipcpath: join(DATADIR, "geth.ipc"),
    password: join(DATADIR, ".password")
  }
};

var pbkdf2 = keythereum.crypto.pbkdf2;
var pbkdf2Sync = keythereum.crypto.pbkdf2Sync;

function generateAddress(cb){
    var params = {keyBytes:32, ivBytes: 16};

    var dk = keythereum.create(params);

    keythereum.create(params, function (dk){
        var options = {};
        var password = generatePassword();
        keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options,
            function (keyObject){
            cb(keyObject, password);
            });
    });
}

function createKey(passphrase){
    var dk = keythereum.create();
    var key = keythereum.dump(passphrase, dk.privateKey, dk.salt, dk.iv);
    return JSON.stringify(key);
}

json = createKey();
