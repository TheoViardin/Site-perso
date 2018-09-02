let Block = require("./Block.js")

class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()];
    }

    // Initialise chain with first block (first block)
    createGenesisBlock() {
        return new Block(0, {from:'Genesis', object:'Genesis', message:'Genesis'}, "");
    }

    // Get last chain block
    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Get block at the end of the chain
    addBlock(data) {
        let newBlock = new Block(this.chain.length, data, this.getLastestBlock().hash);
        newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // Check that the chain has not been modified
    verify() {
        for (let index = 1; index < this.chain.length; index++) {
            current = this.chain[index];
            previous = this.chain[index - 1];
            
            if (current.hash != current.calculateHash()) {
                return false;
            }

            if (current.previousHash != previous.hash) {
                return false;
            }

            return true;
        }
    }
}

module.exports = Blockchain;