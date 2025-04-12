const Transaction = require('./transaction');
const Wallet = require('./index');
const {MINING_REWARD} = require('../config');

describe('Transaction', () => {
let transaction, wallet, recipient,amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'B1ockh41n';
        transaction = Transaction.newTransaction(wallet,recipient, amount);
    });

    it('output then amount - balance ',() =>{
        expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount)
        .toEqual(wallet.balance - amount);          
    });
    it('outputs the amount to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
        .toEqual(amount);
    });    

    it('outputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });  
    
    it('validade a valid transaction', () => {
        expect(Transaction.veryfyTransaction(transaction)).toBe(true);
    }); 

//    it('invalid a corrupt transaction', () => {
//        transaction.outputs[0].amount = 50000;
//        expect(Transaction.veryfyTransaction(transaction)).toBe(false);
//    }); 

    describe('Transacting with an amount excedsss the balance ', () => {
        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet,recipient, amount);
        });
        it('does not create then transactiont', () => {
            expect(transaction).toEqual(undefined);
        });   
    });


    describe('Updating a transaction ', () => {
        let nextAmount, nextRecipient;
        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'next-b1ockch41n';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });
        it('substract the next amount from the sender output ', () => {
            expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount);
        });   

        it('outputs an amount for the next recipients ', () => {
            expect(transaction.outputs.find(output => output.address == nextRecipient).amount).toEqual(nextAmount);
        });  
    });

    describe ('creating a reward transaction', () =>{
        beforeEach(() => {
          transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
        });
    
        it('reward the miners wallet', () => {
          expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(MINING_REWARD);
        });
    
    });    
});


