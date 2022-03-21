import './App.css';
import React, { useState } from 'react';
import Web3 from 'web3';

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const connect = () => {
    let provider = window.ethereum;


    if(typeof provider !== 'undefined') {
      provider.request({method: 'eth_requestAccounts'})
        .then(accounts => {
          console.log(accounts);
          setSelectedAccount(accounts[0]);
        })
        .catch(err => {
          console.log(err);
          alert(err);

        });

      window.ethereum.on('accountsChanged', (accounts) => {
        console.log(accounts);
        setSelectedAccount(accounts[0]);
      })
    }

    const web3 = new Web3(provider);
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

      </main>
    </div>
  );
}

export default App;
