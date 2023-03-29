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
	const [currentAccount, setCurrentAccount] = useState('');

  // Check if the wallet is connected at the start
  const checkIfWalletIsConnected = async() => {
		try {
			if (!ethereum) return alert("Please install Metamask");

			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
	
				// getAllTransactions();
			} else {
				console.log('No accounts found');
			}
			console.log(accounts);
		} catch (error) {
			console.log(error);

			throw new Error("No Ethereum object.")
		}
  }

	// Connect the account / wallet
  const connectWallet = async() => {
    try {
   		if (!ethereum) return alert("Please install Metamask");
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

			setCurrentAccount(accounts[0]);
    } catch (error) {
			console.log(error);

			throw new Error("No Ethereum object.")
    }
  }

	// Send and store transactions
	const sendTransaction = async() => {
		try {
			if (!ethereum) return alert("Please install Metamask");

			//  get the data from the form
			
		} catch (error) {
			console.log(error);

			throw new Error("No Ethereum object.")
		}
	}

  // Checking if there are connected accounts only when the app loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      { children }
    </TransactionContext.Provider>
  )
}