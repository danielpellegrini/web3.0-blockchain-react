import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.provider.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.contract(contractAddress, contractABI, signer); // these are the 3 arguments that I need to fetch the smart contract

    console.log({
        provider,
        signer,
        transactionContract
    })
}

export const TransactionProvider = ({ children }) => {
    return (
        <TransactionContext.Provider value={{}}>
            { children }
        </TransactionContext.Provider>
    )
}