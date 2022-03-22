import Web3 from 'web3';
import Contract from 'contracts/Shop.sol/Shop.json';

// let selectedAccount;
let contract;

export const connect = async (setSelectedAccount) => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      provider.request({method: 'eth_requestAccounts'})
        .then(accounts => {
          setSelectedAccount(accounts[0]);
        //   selectedAccount = accounts[0];
          getContractBalance();
          getUserBalance();
        })
        .catch(err => {
          alert(err);
        });

      window.ethereum.on('accountsChanged', (accounts) => {
        setSelectedAccount(accounts[0]);
        // selectedAccount = accounts[0];
        getContractBalance();
        getUserBalance();
      })
    }

    const web3 = new Web3(provider);

    // setContract(new web3.eth.Contract(Contract.abi, '0x0165878A594ca255338adfa4d48449f69242Eb8F'));
    contract = new web3.eth.Contract(Contract.abi, '0x0165878A594ca255338adfa4d48449f69242Eb8F');
}


export const greet = async () => {
    console.log(window.ethereum);
    await contract.methods.setGreeting('New Greeting').send({from: selectedAccount});
    let test = await contract.methods.greet().call();
    console.log(test);
}


export const getContractBalance = async () => {
    return await contract.methods.getBalance().call();
    // setContractBalance(balance);
}


export const getUserBalance = async () => {
    return await contract.methods.getPayer(selectedAccount).call();
    // setUserBalance(balance);
}


export const pay = async (e) => {
    const amount = e.target.parentNode[0].value;
    await contract.methods.pay().send({from: selectedAccount, value: amount});
}