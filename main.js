const SHA256 = require('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculatedHash();
  }

  calculateHash(){
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0, "20/01/2018", "Genesis Block", "0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let vinceCoin = new Blockchain();
vinceCoin.addBlock(new Block(1, "20/01/2018", {amount: 1337}));
vinceCoin.addBlock(new Block(2, "20/01/2018", {amount: 42}));

console.log(JSON.stringify(vinceCoin, null, 4));
