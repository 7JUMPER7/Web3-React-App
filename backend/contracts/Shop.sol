//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Shop {
    mapping (address=>uint) payers;

    function pay() public payable {
        payers[msg.sender] = msg.value;
    }

    function getPayer(address _addr) public view returns(uint) {
        return payers[_addr];
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}
