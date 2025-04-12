const Blockchain = require('../blockchain');
const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const { INITIAL_BALANCE } = require('../config');

describe('Wallet', () => {
  let wallet,tp,bc;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
    bc = new Blockchain();

  });
  describe('create a Transaction()', () => {
    let transaction, sendAmount, recipient;

    beforeEach(() => {
      amount = 50;
      recipient = 'foo-recipient';
      transaction = wallet.createTransaction(recipient,sendAmount,bc,tp) ;
    });


    describe('and doig the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient,sendAmount,bc,tp);
      });

      it('Double the send amount subtract from then wallet balance', () => {
        //expect(transaction.outputs.find(o => o.adress === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2);
        expect(transaction.outputs.find(o => o.adress === wallet.publicKey)).toEqual(undefined);
      });
    });  

  });

  describe('calculing a balance ', () => {
    let addBalance, repeat, senderWallet;

    beforeEach(() => {
      addBalance = 100;
      repeat = 3;
      senderWallet = new Wallet();
      for (let i=0; i<repeat; i++) {
        senderWallet.createTransaction(wallet.publicKey,addBalance,bc,tp);
      }
      bc.addBlock(tp.transactions);
    });

    it('calculates the balance for blockchain transactions matching the recipient', () => {
      expect(wallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeat));
    });

    it('calculates the balance for blockchain transactions matching the sender', () => {
      expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeat));
    });

    describe('recipiente conducts a transaction ', () => {
        let subtractBalance, recipientBalance;
    
        beforeEach(() => {
          tp.clear();
          subtractBalance = 60;
          recipientBalance = wallet.calculateBalance(bc);
          wallet.createTransaction(senderWallet.publicKey, subtractBalance, bc, tp);
          bc.addBlock(tp.transactions);
        });
    
        describe(' and the sender sends another transaction to the recipient ', () => {
  
          beforeEach(() => {
            tp.clear();
            senderWallet.createTransaction(senderWallet.publicKey, addBalance, bc, tp);
            bc.addBlock(tp.transactions);
          });
      
          it('calculates the recipient balance only using transatctions since its most recent', () => {
            expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - subtractBalance + addBalance );
          });
  
        });
  
    });
  });
});


