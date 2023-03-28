// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount; // number variable that it's holding the number of the transaction

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); // argument type and variable name

    struct TransferStruct {
        address sender; 
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // storing all the transactions
    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions () public view returns(TransferStruct[] memory) {
        return transactions;
    }
    function getTransactionCount () public view returns(uint256) {
        return transactionCount;
    }
}