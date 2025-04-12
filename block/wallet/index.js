
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

     createTransaction( recipient, amount, blockchain, tp1) {
        this.balance = this.calculateBalance(blockchain);
      
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
      static blockchainWallet() {
        const blockchainWallet = new this();
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
      }
      calculateBalance(blockchain) {
        let balance = this.balance;
        let transactions = [];

        blockchain.chain.forEach(block => block.data.forEach(transaction => {
          transactions.push(transaction);
        }));
        
        const walletInputsTs = transactions.filter( t => t.input.address === this.publicKey);
        let startTime = 0;
        if (walletInputsTs.length > 0) {
          const recentInputTs = walletInputsTs.reduce(
            (prev,current) => (prev.input.timestamp > current.input.timestamp ? prev : current)
          );

          balance = recentInputTs.outputs.find(output => output.address === this.publicKey).amount;
          startTime = recentInputTs.input.timestamp;
        }

        transactions.forEach(t =>{
          if(t.input.timestamp > startTime) {
            t.outputs.find(output => {
              if (output.address === this.publicKey) {
                balance += output.amount;
              }
            });
          }
        });
        return balance;
      }
    }      

module.exports = Wallet;