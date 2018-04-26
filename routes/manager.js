var keythereum = require('keythereum');
var join = require('path').join;
var assert = require('chai').assert;
var path = require('path');
var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var DATADIR = join(__dirname, "fixtures/keystore");
var addr = "d100e081fd5e8a1156d9e871417f1ac3fe22e6ed";

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

function findKeyfile(address) {
    address = address.replace("0x", "");
    address = address.toLowerCase();
    var i, len, file_path = null;
    var files = fs.readdirSync(DATADIR);
    // var reader = new FileReader();

    for (i = 0, len = files.length; i < len; ++i) {
        if (files[i].indexOf(address) > -1) {
            file_path = path.join(DATADIR, files[i]);
            if (fs.lstatSync(file_path).isDirectory()) {
                file_path = path.join(file_path, files[i]);
            }
            break;
        }
    }

    return JSON.parse(fs.readFileSync(file_path));
}



ad = findKeyfile(addr);
console.log(ad)


