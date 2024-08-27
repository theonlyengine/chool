import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const eduTokenData = EduToken.networks[networkId];

        if (eduTokenData) {
          const eduTokenContract = new web3.eth.Contract(EduToken.abi, eduTokenData.address);
          const tokenBalance = await eduTokenContract.methods.balanceOf(accounts[0]).call();
          setBalance(web3.utils.fromWei(tokenBalance, 'Ether'));
        } else {
          alert('EduToken contract not deployed to detected network.');
        }
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Wallet</h1>
      <p>Your account: {account}</p>
      <p>Your EduToken balance: {balance}</p>
    </div>
  );
};

export default Wallet;
