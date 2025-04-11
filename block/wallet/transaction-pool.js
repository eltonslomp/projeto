const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactions= [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  } 
  

  //clear() {this.transactionMap = {}; }

  //setTransaction(transaction) {this.transactionMap[transaction.id] = transaction;  }

  //setMap(transactionMap) {this.transactionMap = transactionMap; }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0); 
      if (transaction.input.amount !== outputTotal) {
        console.log(`Invalid transaction from ${transaction.input.address}`);
        return;
      } 
      
      if (!Transaction.veryfyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}`);
        return;
      };
      
      return transaction;
    })
  }
 /* 
  clearBlockchainTransactions({ chain }) {
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (this.transactionMap[transaction.id]) {
          delete this.transactionMap[transaction.id];
        }
      }
    }
  }
    */
}

module.exports = TransactionPool;
