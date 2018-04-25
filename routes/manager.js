var keythereum = require('keythereum');
var join = require('path').join;
var assert = require('chai').assert;
var geth = require('geth');
var fs = require('fs');

var DATADIR = join(__dirname, "fixtures/keystore");

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

function createAccount(password){
    json = createKey(password);

    keyObject = JSON.parse(json);
    assert.isObject(keyObject);

    console.log(keyObject.address);

    keythereum.exportToFile(keyObject, DATADIR, function(err){
        if (err) {
            return console.log(err);
        }
        options.flags.unlock = keyObject.address;
        console.log("Export complete!")
    });
    return json
}

function checkKeyExistence(address) {
    var fso = new ActiveXObject('Scripting.FileSystemObject');
    if (fso.FolderExists(DATADIR)) {

    }
}

function findKeyfile(keystore, address, files) {
    address = address.replace("0x", "");
    address = address.toLowerCase();
    var i, len, filepath = null;
    for (i = 0, len = files.length; i < len; ++i) {
        if (files[i].indexOf(address) > -1) {
            filepath = path.join(keystore, files[i]);
            if (fs.lstatSync(filepath).isDirectory()) {
                filepath = path.join(filepath, files[i]);
                console.log(filepath)
            }
            break;
        }
    }
    return filepath;
}
var addr = "0xd100e081fd5e8a1156d9e871417f1ac3fe22e6ed"
// ad = findKeyfile(DATADIR ,addr, fs.readdirSync(DATADIR));
ca = createAccount('password');
console.log(ca);
