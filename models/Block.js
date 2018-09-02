let sha256 = require("sha256");

class Block {
    constructor (index, data, previousHash) {
        this.index = index;
        this.data = data;
        this.date = new Date();
        this.hash = this.calculateHash();
        this.previousHash = previousHash;
    }

    // Calculate hash for this block using data in it
    calculateHash() {
        return sha256(this.index + this.data + this.date + this.previousHash);
    }
}

module.exports = Block;