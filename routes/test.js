var keythereum = require('keythereum');
var join = require('path').join;
var assert = require('chai').assert;
var geth = require('geth');

var DATADIR = join(__dirname, "fixtures");

var password = 'password';

var options = {
    persist: false,
    flags: {
        datadir: DATADIR,
        ipcpath: join(DATADIR, "geth.ipc"),
        password: join(DATADIR, ".password")
    }
};

function createKey(passphrase){
    var dk = keythereum.create();
    var key = keythereum.dump(passphrase, dk.privateKey, dk.salt, dk.iv);
    return JSON.stringify(key);
}

json = createKey(password);

keyObject = JSON.parse(json);
assert.isObject(keyObject);

console.log(json);
console.log(keyObject.address);

keythereum.exportToFile(keyObject, join(DATADIR, "keystore"), function(err){
    if (err) {
        return console.log(err);
    }
    options.flags.unlock = keyObject.address;
    console.log("Export complete!")
});

