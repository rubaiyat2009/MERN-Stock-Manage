const sha = require('js-sha256')

function reHashing(Value) {

    var hash = sha.sha256.create();
    hash.update(Value.toString());
    hash.hex();
    var b = hash.toString();

    var b2 = "";
    for (var i = 0; i < b.length; i++) {
        b2 = b2 + b.substring(63 - i, 64 - i);
    }
    var b3 = b2.substring(32) + b2.substring(0, 32);
    var b4 = b3.substring(48) + b3.substring(32, 48) + b3.substring(16, 32) + b3.substring(0, 16);
    return b4;
}

module.exports = {
    reHashing,
}
