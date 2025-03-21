const SHA256  = require('crypto-js/sha256');

class Block{
    constructor(timestamp,lastHash,hash,data){
        this.timestamp = timestamp;
        this.lastHash =lastHash;
        this.hash= hash;
        this.data = data; 
    }
    
    toString(){
        return `Block -  timestamp : ${this.timestamp} lastHash : ${this.lastHash.substring(0,10)}   hash : ${this.hash.substring(0,10)}  data : ${this.data}`;
    }

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57', []);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp,lastHash,data);
      return new this(timestamp, lastHash, hash, data);
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block;
      return Block.hash(timestamp, lastHash, data);
    }

}
module.exports = Block;

