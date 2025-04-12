const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');

describe('TransactionPool', () => {
  let transactionPool, transaction, senderWallet,bc;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    senderWallet = new Wallet();
    bc = new Blockchain();
    transaction = senderWallet.createTransaction('fake-recipient',30, bc,transactionPool);
    });

    it('adds a transaction to the pool', () => {
      expect(transactionPool.transactions.find (t => t.id === transaction.id)).toEqual(transaction);
    });

    it('clear transactions', () => {
      transactionPool.clear();
      expect(transactionPool.transactions).toEqual([]);
    });

    it('update  a transaction to the pool ', () => {
      const oldTransaction = JSON.stringify(transaction);
      const newTransaction = transaction.update(senderWallet, 'new-recipient', 100);
      transactionPool.updateOrAddTransaction(newTransaction);
      expect(JSON.stringify(transactionPool.transactions.find (t => t.id === newTransaction))).not.toEqual(oldTransaction);
    });

    describe('mixing valid and corrupt transactions', () => {
      let validTransactions;

      beforeEach(() => {
        validTransactions = [...transactionPool.transactions];
    
        for (let i=0; i<6; i++) {
            let wallet = new Wallet();
            transaction = wallet.createTransaction('fake-recipient', 30, bc,transactionPool);
            if(i%2== 0) {
              transaction.input.amount = 99999;
            }else 
            {
              validTransactions.push(transaction);
            }  
        }
    });
    it('shows a difference between valid and corrupt transactions ', () => {
      expect(JSON.stringify(transactionPool.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });
    it('grabs valid transactions ', () => {
      expect(transactionPool.validTransactions()).toEqual(validTransactions);
    });
  });




});