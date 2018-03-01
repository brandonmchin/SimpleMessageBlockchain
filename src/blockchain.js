const SHA256 = require('crypto-js/sha256');

class Message {
	constructor(sender, message) {
		this.sender = sender;
		this.message = message;
	}
}

class Block {
	constructor(timestamp, messages, previousHash='') {
		this.timestamp = timestamp;
		this.messages = messages;
		this.previousHash = previousHash;
		this.hash = this.genHash();
		this.nonce = 0;
	}

	genHash() {
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty) {
		// Proof-of-work
		// In order to add a block to the chain, a problem must be solved (this is to control the rate of new blocks added)
		// Continue to calculate hash until the first difficulty number of characters are zero
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
			this.nonce++;
			this.hash = this.genHash();
		}

		console.log("BLOCK MINED: " + this.hash); 
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 5;
		this.pendingMessages = [];
	}

	createGenesisBlock() {
		return new Block("0", "Genesis", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingMessages() {
		console.log('MINING BLOCK ' + (this.chain.length) + '...');

		let block = new Block(Date.now(), this.pendingMessages, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		this.chain.push(block);

		this.pendingMessages = [];		// clear pending messages

	}

	createMessage(message) {
		this.pendingMessages.push(message);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.genHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}

			return true;
		}
	}
}

module.exports = {
	Message: Message,
	Block: Block,
	Blockchain: Blockchain
}