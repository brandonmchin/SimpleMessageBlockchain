const blockchain = require('./src/blockchain');

let MyBlockChain = new blockchain.Blockchain();

MyBlockChain.createMessage(new blockchain.Message('brandon', 'hello'));
MyBlockChain.createMessage(new blockchain.Message('leslie', 'yo'));

MyBlockChain.minePendingMessages();

MyBlockChain.createMessage(new blockchain.Message('brandon', 'testing'));
MyBlockChain.createMessage(new blockchain.Message('leslie', '1... 2... 3...'));

MyBlockChain.minePendingMessages();

MyBlockChain.createMessage(new blockchain.Message('brandon', 'peace out'));		// pending message

console.log(JSON.stringify(MyBlockChain, null, 4));

console.log('Validity: ' + MyBlockChain.isChainValid());