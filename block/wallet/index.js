
const ChainUtil = require('../chain-util');
const {INITIAL_BALANCE} = require('../config');
const { ec, cryptoHash } = require('../util');
const Transaction = require('./transaction');


class Wallet {

    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }
    toString() {
        return `Wallet - publicKey: ${this.publicKey.toString()} balance: ${this.balance}`;
    }   
     sign(dataHash) {
        return this.keyPair.sign(dataHash);
     }

     createTransaction( recipient, amount, tp1) {
        if (amount > this.balance) {
          console.log (`Amount : ${amount} exceeds balance : ${this.balance}`);
          return;
        }
        let transaction = tp1.existingTransaction(this.publicKey);
        if (transaction) {
          transaction.update(this, recipient, amount);
        } else {
          transaction = Transaction.newTransaction(this, recipient, amount);
          tp1.updateOrAddTransaction(transaction);
        }
        return transaction;
      }     

 
    
}

module.exports = Wallet;