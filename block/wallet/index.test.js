const Wallet = require('./index');
//const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool');
//const { verifySignature } = require('../util');
//const Blockchain = require('../blockchain');
//const { STARTING_BALANCE } = require('../config');

describe('Wallet', () => {
  let wallet,tp;

  beforeEach(() => {
    wallet = new Wallet();
    tp = new TransactionPool();
  });
  describe('create a Transaction()', () => {
    let transaction, sendAmount, recipient;

    beforeEach(() => {
      amount = 50;
      recipient = 'foo-recipient';
      transaction = wallet.createTransaction(recipient,sendAmount,tp) ;
    });


    describe('and doig the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient,sendAmount,tp);
      });

      it('Double the send amount subtract from then wallet balance', () => {
        //expect(transaction.outputs.find(o => o.adress === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2);
        expect(transaction.outputs.find(o => o.adress === wallet.publicKey)).toEqual(undefined);
      });

//      it('clonando', () => {
//        expect(transaction.outputs.filter(output => output.adress === recipient).map(o => o.amount)).toEqual([sendAmount,sendAmount]);
//      });  
  
    });  

  });

          /*
              describe('signing data', () => {
                const data = 'foobar';
            
                it('verifies a signature', () => {
                  expect(
                    verifySignature({
                      publicKey: wallet.publicKey,
                      data,
                      signature: wallet.sign(data)
                    })
                  ).toBe(true);
                });
            
                it('does not verify an invalid signature', () => {
                  expect(
                    verifySignature({
                      publicKey: wallet.publicKey,
                      data,
                      signature: new Wallet().sign(data)
                    })
                  ).toBe(false);
                });
              });

              describe('and the amount is valid', () => {
                let transaction, amount, recipient;

                beforeEach(() => {
                  amount = 50;
                  recipient = 'foo-recipient';
                  transaction = wallet.createTransaction({ amount, recipient });
                });

                it('creates an instance of `Transaction`', () => {
                  expect(transaction instanceof Transaction).toBe(true);
                });

                it('matches the transaction input with the wallet', () => {
                  expect(transaction.input.address).toEqual(wallet.publicKey);
                });

                it('outputs the amount the recipient', () => {
                  expect(transaction.outputMap[recipient]).toEqual(amount);
                });
              });

              describe('and a chain is passed', () => {
                it('calls `Wallet.calculateBalance`', () => {
                  const calculateBalanceMock = jest.fn();

                  const originalCalculateBalance = Wallet.calculateBalance;

                  Wallet.calculateBalance = calculateBalanceMock;

                  wallet.createTransaction({
                    recipient: 'foo',
                    amount: 10,
                    chain: new Blockchain().chain
                  });

                  expect(calculateBalanceMock).toHaveBeenCalled();

                  Wallet.calculateBalance = originalCalculateBalance;
                });
              });
            });

            describe('calculateBalance()', () => {
              let blockchain;

              beforeEach(() => {
                blockchain = new Blockchain();
              });

              describe('and there are no outputs for the wallet', () => {
                it('returns the `STARTING_BALANCE`', () => {
                  expect(
                    Wallet.calculateBalance({
                      chain: blockchain.chain,
                      address: wallet.publicKey
                    })
                  ).toEqual(STARTING_BALANCE);
                });
              });

              describe('and there are outputs for the wallet', () => {
                let transactionOne, transactionTwo;

                beforeEach(() => {
                  transactionOne = new Wallet().createTransaction({
                    recipient: wallet.publicKey,
                    amount: 50
                  });

                  transactionTwo = new Wallet().createTransaction({
                    recipient: wallet.publicKey,
                    amount: 60
                  });

                  blockchain.addBlock({ data: [transactionOne, transactionTwo] });
                });

                it('adds the sum of all outputs to the wallet balance', () => {
                  expect(
                    Wallet.calculateBalance({
                      chain: blockchain.chain,
                      address: wallet.publicKey
                    })
                  ).toEqual(
                    STARTING_BALANCE +
                    transactionOne.outputMap[wallet.publicKey] +
                    transactionTwo.outputMap[wallet.publicKey]
                  );
                });

                describe('and the wallet has made a transaction', () => {
                  let recentTransaction;


                  beforeEach(() => {
                    recentTransaction = wallet.createTransaction({
                      recipient: 'foo-address',
                      amount: 30
                    });

                    blockchain.addBlock({ data: [recentTransaction] });
                  });

                  it('returns the output amount of the recent transaction', () => {
                    expect(
                      Wallet.calculateBalance({
                        chain: blockchain.chain,
                        address: wallet.publicKey
                      })
                    ).toEqual(recentTransaction.outputMap[wallet.publicKey]);
                  });

                  describe('and there are outputs next to and after the recent transaction', () => {
                    let sameBlockTransaction, nextBlockTransaction;

                    beforeEach(() => {
                      recentTransaction = wallet.createTransaction({
                        recipient: 'later-foo-address',
                        amount: 60
                      });

                      sameBlockTransaction = Transaction.rewardTransaction({ minerWallet: wallet });

                      blockchain.addBlock({ data: [recentTransaction, sameBlockTransaction] });

                      nextBlockTransaction = new Wallet().createTransaction({
                        recipient: wallet.publicKey, amount: 75
                      });

                      blockchain.addBlock({ data: [nextBlockTransaction] });
                    });

                    it('includes the output amounts in the returned balance', () => {
                      expect(
                        Wallet.calculateBalance({
                          chain: blockchain.chain,
                          address: wallet.publicKey
                        })
                      ).toEqual(
                        recentTransaction.outputMap[wallet.publicKey] +
                        sameBlockTransaction.outputMap[wallet.publicKey] +
                        nextBlockTransaction.outputMap[wallet.publicKey]
                      );
                    });
                  });
                });
              });*/


});


