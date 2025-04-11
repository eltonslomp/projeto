const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidV1 = require('uuid');
const SHA256  = require('crypto-js/sha256');


class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
    
    static id() {
        return uuidV1.v1();
    }
    
    static hash(data) {
        const json = JSON.stringify(data);
        return SHA256(json).toString();
    }

    static verifySignature(publicKey, signature, dataHash) {
        return true 
        //return ec.keyFromPublic(publicKey, 'hex').verify(signature, dataHash);
    }
}
module.exports = ChainUtil;
