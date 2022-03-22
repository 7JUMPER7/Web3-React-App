import './App.css';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Contract from 'contracts/Shop.sol/Shop.json';

let selectedAccount;
let contract;

function App() {
  const [contractBalance, setContractBalance] = useState(0);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    let provider = window.ethereum;


    if(typeof provider !== 'undefined') {
      provider.request({method: 'eth_requestAccounts'})
        .then(accounts => {
          // setSelectedAccount(accounts[0]);
          selectedAccount = accounts[0];
          getContractBalance();
          getUserBalance();
        })
        .catch(err => {
          alert(err);
        });

      window.ethereum.on('accountsChanged', (accounts) => {
        // setSelectedAccount(accounts[0]);
        selectedAccount = accounts[0];
        getContractBalance();
        getUserBalance();
      })
    }

    const web3 = new Web3(provider);

    // setContract(new web3.eth.Contract(Contract.abi, '0x0165878A594ca255338adfa4d48449f69242Eb8F'));
    contract = new web3.eth.Contract(Contract.abi, '0x0165878A594ca255338adfa4d48449f69242Eb8F');
  }


  const greet = async () => {
    console.log(window.ethereum);
    await contract.methods.setGreeting('New Greeting').send({from: selectedAccount});
    let test = await contract.methods.greet().call();
    console.log(test);
  }


  const getContractBalance = async () => {
    const balance = await contract.methods.getBalance().call();
    setContractBalance(balance);
  }


  const getUserBalance = async () => {
    const balance = await contract.methods.getPayer(selectedAccount).call();
    setUserBalance(balance);
  }


  const pay = async (e) => {
    const amount = +e.target.parentNode[0].value;
    await contract.methods.pay().send({from: selectedAccount, value: amount});
  }

  return (
    <div className="App">
      <header className="App-header">
        <span>Test Project</span>

        {
          selectedAccount ?
          <div>{selectedAccount}</div>
          :
          <button onClick={() => connect()}>Connect</button>
        }
      </header>

      <main>
        <div>
          Contract balance: {contractBalance}
        </div>
        <div>
          Your donation: {userBalance}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input type={'number'} placeholder={'Amount'}></input>
          <input type={'submit'} value={'Отправить'} onClick={(e) => pay(e)}></input>
        </form>
      </main>
    </div>
  );
}

export default App;
