import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.BrowserProvider(ethereum)
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer); // these are the 3 arguments that I need to fetch the smart contract

  return transactionsContract;
}

export const TransactionsProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	}

	// console.log(formData)
	
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
			// console.log(accounts);
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
			
			const { addressTo, amount, keyword, message } = formData;
			const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount)

      // Send Eth from one address to another
      await ethereum.request({ 
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex, 
        }]
       });

       const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
       
       setIsLoading(true);
       console.log(`Loading - ${transactionHash.hash}`);
       await transactionHash.wait();
       setIsLoading(false);
       console.log(`Success - ${transactionHash.hash}`);

       const transactionCount = await transactionsContract.getTransactionCount();
       setTransactionCount(transactionCount.toNumber());

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
    <TransactionContext.Provider value={{ connectWallet, currentAccount, sendTransaction, formData, setFormData, handleChange }}>
      { children }
    </TransactionContext.Provider>
  )
}